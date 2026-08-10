import { Schema, model } from "mongoose"

const ReviewSchema = new Schema(
  {
    cafe: {
      type: Schema.Types.ObjectId,
      ref: "Cafe",
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    photoUrls: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

ReviewSchema.index({ cafe: 1, createdAt: -1 })
ReviewSchema.index({ user: 1, cafe: 1 }, { unique: true })

export default model("Review", ReviewSchema)



