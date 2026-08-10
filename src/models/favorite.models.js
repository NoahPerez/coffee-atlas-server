import { Schema, model } from "mongoose"

const FavoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    cafe: {
      type: Schema.Types.ObjectId,
      ref: "Cafe",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

FavoriteSchema.index({ user: 1, cafe: 1 }, { unique: true })

export default model("Favorite", FavoriteSchema)
