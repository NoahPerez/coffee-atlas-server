import express from "express"

const router = express.Router({ mergeParams: true })

router.get("/", (req, res) => {
  res.status(200).json({ message: "Reviews" })
})

router.post("/", (req, res) => {
  res.status(200).json({ message: "Review added " })
})

export default router
