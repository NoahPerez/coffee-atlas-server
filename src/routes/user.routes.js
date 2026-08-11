import express from "express"
import isAuth from "../middleware/isAuth.js"
import { verify } from "../controllers/user.Controller.js"

const router = express.Router()

router.get("/me", isAuth, verify)

router.get("/me/favorites", isAuth, (req, res) => {
  res.status(200).json({ message: "My favorites", user: req.user })
})

export default router
