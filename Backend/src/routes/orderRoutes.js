const express = require('express')
const { placeOrder, getMyOrders, listOrders, updateOrderStatus } = require('../controllers/orderController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/place', protect, placeOrder)
router.get('/my', protect, getMyOrders)
router.get('/', protect, adminOnly, listOrders)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus)

module.exports = router
