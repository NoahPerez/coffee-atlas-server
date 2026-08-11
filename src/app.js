import express from "express"
import cors from "cors"
import morgan from "morgan"
import errorHandler from "./middleware/errorHandler.js"
import authRouter from "./routes/auth.routes.js"
import cafeRouter from "./routes/cafes.routes.js"
import reviewRouter from "./routes/reviews.routes.js"
import favoritesRouter from "./routes/favorites.routes.js"
import userRouter from "./routes/user.routes.js"

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(morgan("dev"))

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" })
})

app.use("/api/auth", authRouter)
app.use("/api/cafes", cafeRouter)
app.use("/api/cafes/:cafeId/reviews", reviewRouter)
app.use("/api/cafes", favoritesRouter)
app.use("/api/users", userRouter)

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" })
})

app.use(errorHandler)

export default app
