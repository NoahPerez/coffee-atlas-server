export default function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500

  if (process.env.NODE_ENV !== "production") {
    console.error(err)
  }

  const message =
    status === 500 && process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error"

  res.status(status).json({ success: false, message })
}
