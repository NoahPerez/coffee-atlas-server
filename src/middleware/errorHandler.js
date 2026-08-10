export default function errorHandler(err, req, res, next) {
  console.error(err.stack)

  res
    .status(500)
    .json({ success: false, massage: err.message || "Internal server error" })
}
