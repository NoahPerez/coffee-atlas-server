import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/users.models.js"

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

const signUp = async (req, res, next) => {
  try {
    const { email, fullName, password } = req.body

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Please provide all fields" })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Provide a valid email" })
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8 characters long and contain one uppercase and one lowercase character, a number, and a special character.",
      })
    }

    const foundUser = await User.findOne({ email: normalizedEmail })
    if (foundUser) {
      return res.status(409).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const createdUser = await User.create({
      email: normalizedEmail,
      fullName,
      passwordHash,
    })

    res.status(201).json({ user: createdUser })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide email and password" })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const foundUser = await User.findOne({ email: normalizedEmail }).select(
      "+passwordHash"
    )

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const passwordCheck = await bcrypt.compare(password, foundUser.passwordHash)

    if (!passwordCheck) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      {
        email: foundUser.email,
        fullName: foundUser.fullName,
        _id: foundUser._id,
        role: foundUser.role,
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "1h" }
    )

    const { passwordHash: _passwordHash, ...user } = foundUser.toObject()

    res.status(200).json({ message: "logged in successfully", token, user })
  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user })
  } catch (error) {
    next(error)
  }
}

export { getAllUsers, login, signUp, verify }
