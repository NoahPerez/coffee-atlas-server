import express from "express"

const router = express.Router()

router.post("/:cafeId/favorite", (req, res) => {
  res.status(201).json({ message: "Favorite Cafe added" })
})

router.delete("/:cafeId/favorite", (req, res) => {
  res.sendStatus(204)
})

export default router
