import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL)

    console.log(`✅ MongoDB Connected: ${connection.connection.name}`)
  } catch (error) {
    console.error(`❌ MongoBD connection error: ${error.message}`)

    process.exit(1)
  }
}

export default connectDB

// process.exit(1)
// IT MEANS:
// ;("The application cannot start correctly because the database connection failed, so terminate the Node.js process with an error.")

// MongoDB ❌
//      ↓
// connectDB()
//      ↓
// ❌ Connection failed
//      ↓
// process.exit(1)
//      ↓
// Server doesn't start
