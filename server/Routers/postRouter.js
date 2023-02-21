import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePosts,
  likeDislike,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

// get all the posts
router.get("/", getAllPosts);

// get single posts
router.get("/:id", getSinglePosts);

// create a new post
router.post("/create", createPost);

// update a new post
router.put("/update/:id", updatePost);

// delete a new post
router.delete("/delete/:id", deletePost);

// like and dislike post
router.put("/:id/like", likeDislike);

export default router;
