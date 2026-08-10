import { Schema, model } from "mongoose"

const CafeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      default: "",
      trim: true,
    },
    photoUrls: {
      type: [String],
      default: [],
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    contact: {
      website: {
        type: String,
        default: "",
        trim: true,
      },
      phone: {
        type: String,
        default: "",
        trim: true,
      },
    },
    hours: {
      type: String,
      default: "",
      trim: true,
    },
    amenities: {
      wifi: {
        type: Boolean,
        default: false,
      },
      outdoorSeating: {
        type: Boolean,
        default: false,
      },
      powerOutlets: {
        type: Boolean,
        default: false,
      },
      veganOptions: {
        type: Boolean,
        default: false,
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    menuUrl: {
      type: String,
      default: "",
      trim: true,
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    source: {
      type: String,
      enum: ["manual", "loffee", "overpass", "geoapify"],
      default: "manual",
      index: true,
    },
    externalIds: {
      loffee: {
        type: String,
        default: "",
        trim: true,
      },
      osm: {
        type: String,
        default: "",
        trim: true,
      },
      geoapify: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
)

CafeSchema.index({ location: "2dsphere" })

export default model("Cafe", CafeSchema)
