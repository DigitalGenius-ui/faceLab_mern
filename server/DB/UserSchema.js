import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    userImg: {
      type: String,
      default: "",
    },
    userBanner: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    born: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    work: {
      type: String,
      default: "",
    },
    follows: {
      type: [String],
      default: [],
    },
    followers: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
