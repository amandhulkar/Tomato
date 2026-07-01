const express = require('express')
const multer = require('multer')
const { addFood, listFood, removeFood, updateFood, updateFoodAvailability } = require('../controllers/foodController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

const router = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-')
    cb(null, `${Date.now()}-${safeName}`)
  }
})

const upload = multer({ storage })

router.get('/', listFood)
router.post('/', protect, adminOnly, upload.single('image'), addFood)
router.put('/:id', protect, adminOnly, upload.single('image'), updateFood)
router.delete('/:id', protect, adminOnly, removeFood)
router.patch('/:id/availability', protect, adminOnly, updateFoodAvailability)

module.exports = router
