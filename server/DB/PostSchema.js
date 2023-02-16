import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    postImg: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("posts", postSchema);
