import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({ message: "Cafes route" })
})

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Cafe route" })
})

export default router
