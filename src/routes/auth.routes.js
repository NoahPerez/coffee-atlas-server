import express from "express"

const router = express.Router()

router.post("/signup", (req, res) => {
  res.status(200).json({ message: "Signup route" })
})

router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login route" })
})

router.get("/me", (req, res) => {
  res.status(200).json({ message: "Me route" })
})

export default router

