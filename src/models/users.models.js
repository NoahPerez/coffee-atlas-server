import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Provide valid email"],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    avatarUrl: {
      type: String,
      default: null,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.passwordHash
        return ret
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.passwordHash
        return ret
      },
    },
  }
)

UserSchema.index({ email: 1 }, { unique: true })

export default model("User", UserSchema)
