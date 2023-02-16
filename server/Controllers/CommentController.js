import { Comment } from "../DB/CommentSchema.js";
import { Post } from "../DB/PostSchema.js";

// add comments
export const postComment = async (req, res) => {
  const id = req.params.id;
  const newComment = new Comment({ ...req.body });
  try {
    const saveComment = await newComment.save();
    await Post.findByIdAndUpdate(id, { $push: { comments: saveComment._id } });
    res.status(200).json(saveComment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// add comments
export const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json("Comment has been removed");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// like comments 
export const likeComments = async (req, res) => {
  const userId = req.body.userId;
  const commentId = req.params.id;
  const comment = await Comment.findById(commentId);
  try {
    if (comment.likes.includes(userId)) {
      await comment.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Comment is disLiked");
    } else {
      await comment.updateOne({ $push: { likes: userId } });
      res.status(200).json("Comment is liked");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
