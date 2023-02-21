import { Post } from "../DB/PostSchema.js";

// get all posts
export const getAllPosts = async (req, res) => {
  const username = req.query.username;

  let posts;
  try {
    if (username) {
      posts = await Post.find({ username }).populate("comments");
    } else {
      posts = await Post.find({}).populate("comments");
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(401).json(error);
  }
};

// get single post
export const getSinglePosts = async (req, res) => {
  const id = req.params.id;
  try {
    const getSinglePost = await Post.findById(id).populate("comments");
    res.status(200).json(getSinglePost);
  } catch (error) {
    res.status(401).json(error);
  }
};

// create new post
export const createPost = async (req, res) => {
  const post = req.body;
  const newPosts = new Post({ ...post });
  try {
    const newPost = await newPosts.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(401).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const newPost = await Post.findByIdAndUpdate(id, req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(401).json(error);
  }
};

// delete post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const newPost = await Post.findByIdAndDelete(id);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(401).json(error);
  }
};

// like and dislike
export const likeDislike = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  console.log(req.authId);
  try {
    const post = await Post.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post has been dislikes");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post has been liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
