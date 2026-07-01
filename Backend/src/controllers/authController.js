const { validationResult } = require('express-validator')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const sendUserResponse = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
}

const signupUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      throw new Error(errors.array()[0].msg)
    }

    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({ name, email, password })
    sendUserResponse(res, user, 201)
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400)
      throw new Error(errors.array()[0].msg)
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
      return sendUserResponse(res, user)
    }

    res.status(401)
    throw new Error('Invalid email or password')
  } catch (error) {
    next(error)
  }
}

const getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  })
}

module.exports = { signupUser, loginUser, getCurrentUser }
