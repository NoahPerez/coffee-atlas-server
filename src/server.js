import connectDB from "./config/connect.js"
import app from "./app.js"

const PORT = process.env.PORT || 5005

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

startServer()
