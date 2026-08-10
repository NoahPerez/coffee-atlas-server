import express from "express"
import isAuth from "../middleware/isAuth.js"

const router = express.Router()

router.get("/me", isAuth, (req, res) => {
  res.status(200).json({ user: req.user })
})

router.get("/me/favorites", isAuth, (req, res) => {
  res.status(200).json({ message: "My favorites", user: req.user })
})

export default router
