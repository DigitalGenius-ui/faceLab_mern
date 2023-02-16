import express from "express";
import {
  deleteComment,
  likeComments,
  postComment,
} from "../Controllers/CommentController.js";

const router = express.Router();

// create comment
router.post("/:id", postComment);

// remove comments
router.delete("/remove/:id", deleteComment);

// like comments
router.put("/like/:id", likeComments);

export default router;
