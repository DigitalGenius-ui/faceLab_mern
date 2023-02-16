import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    userImg: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    commentText: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comments", commentSchema);
