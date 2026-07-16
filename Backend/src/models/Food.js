const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    available: {
      type: Boolean,
      default: true
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    source: {
      type: String,
      enum: ['admin', 'static'],
      default: 'admin'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Food', foodSchema)
