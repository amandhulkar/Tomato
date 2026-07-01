const Food = require('../models/Food')
const Order = require('../models/Order')

const allowedStatuses = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']

const placeOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400)
      throw new Error('No order items')
    }

    if (!deliveryAddress || !deliveryAddress.firstName || !deliveryAddress.phone || !deliveryAddress.street) {
      res.status(400)
      throw new Error('Delivery address is required')
    }

    const foodIds = items.map((item) => item.food)
    const foods = await Food.find({ _id: { $in: foodIds } })

    const orderItems = []
    let subtotal = 0

    for (const item of items) {
      const quantity = Number(item.quantity)
      if (!Number.isInteger(quantity) || quantity < 1) {
        res.status(400)
        throw new Error('Invalid item quantity')
      }

      const food = foods.find((foodItem) => foodItem._id.toString() === item.food)
      if (!food) {
        res.status(400)
        throw new Error('Food item not found')
      }

      if (!food.available) {
        res.status(400)
        throw new Error(`${food.name} is not available`)
      }

      subtotal += food.price * quantity
      orderItems.push({
        food: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
        quantity
      })
    }

    const deliveryFee = subtotal === 0 ? 0 : Number(process.env.DELIVERY_FEE || 50)
    const total = subtotal + deliveryFee

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      orderStatus: 'placed'
    })

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    })
  } catch (error) {
    next(error)
  }
}

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ success: true, orders })
  } catch (error) {
    next(error)
  }
}

const listOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 })
    res.json({ success: true, orders })
  } catch (error) {
    next(error)
  }
}

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body

    if (!allowedStatuses.includes(orderStatus)) {
      res.status(400)
      throw new Error('Invalid order status')
    }

    const order = await Order.findById(req.params.id)

    if (!order) {
      res.status(404)
      throw new Error('Order not found')
    }

    order.orderStatus = orderStatus
    if (orderStatus === 'delivered' && order.paymentMethod === 'cod') {
      order.paymentStatus = 'paid'
    }

    await order.save()

    res.json({
      success: true,
      message: 'Order status updated',
      order
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { placeOrder, getMyOrders, listOrders, updateOrderStatus }
