const fs = require('fs')
const path = require('path')
const Food = require('../models/Food')

const addFood = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body

    if (!name || !description || !price || !category) {
      res.status(400)
      throw new Error('All food fields are required')
    }

    if (!req.file) {
      res.status(400)
      throw new Error('Food image is required')
    }

    const food = await Food.create({
      name,
      description,
      price: Number(price),
      category,
      image: `/uploads/${req.file.filename}`
    })

    res.status(201).json({
      success: true,
      message: 'Food added successfully',
      food
    })
  } catch (error) {
    next(error)
  }
}

const listFood = async (req, res, next) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 })
    res.json({ success: true, foods })
  } catch (error) {
    next(error)
  }
}

const removeFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id)

    if (!food) {
      res.status(404)
      throw new Error('Food not found')
    }

    if (food.image && food.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', '..', food.image)
      fs.unlink(imagePath, () => {})
    }

    await food.deleteOne()

    res.json({
      success: true,
      message: 'Food removed successfully'
    })
  } catch (error) {
    next(error)
  }
}

const updateFood = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body

    if (!name || !description || !price || !category) {
      res.status(400)
      throw new Error('All food fields are required')
    }

    const food = await Food.findById(req.params.id)

    if (!food) {
      res.status(404)
      throw new Error('Food not found')
    }

    const oldImage = food.image

    food.name = name
    food.description = description
    food.price = Number(price)
    food.category = category

    if (req.file) {
      food.image = `/uploads/${req.file.filename}`
    }

    const updatedFood = await food.save()

    if (req.file && oldImage && oldImage.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', '..', oldImage)
      fs.unlink(imagePath, () => {})
    }

    res.json({
      success: true,
      message: 'Food updated successfully',
      food: updatedFood
    })
  } catch (error) {
    next(error)
  }
}

const updateFoodAvailability = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id)

    if (!food) {
      res.status(404)
      throw new Error('Food not found')
    }

    food.available = Boolean(req.body.available)
    await food.save()

    res.json({ success: true, food })
  } catch (error) {
    next(error)
  }
}

module.exports = { addFood, listFood, removeFood, updateFood, updateFoodAvailability }
