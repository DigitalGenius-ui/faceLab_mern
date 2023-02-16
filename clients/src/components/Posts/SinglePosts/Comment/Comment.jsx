import React, { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import "./Comment.scss";
import { useMutation, useQueryClient } from "react-query";
import { commentLike, removeComment } from "../../../../fetchHook/postFetch";
import moment from "moment";
import { FaceLab } from "../../../../context/Context";

const Comment = ({
  commentData,
  allComments,
  setComment,
  comment,
  postUserId,
}) => {
  const { isAuth } = FaceLab();
  const { _id: authId } = isAuth;
  const { userImg, username, userId, createdAt, commentText, _id, likes } =
    commentData;
  const [likeComment, setLikeComment] = useState(likes.length);
  const [isCommentLiked, setIsCommentLiked] = useState(likes.includes(authId));

  const folder = process.env.React_App_PF;

  // like comment
  const likeComments = useMutation(() => commentLike(_id, authId), {
    onSuccess: (res) => res,
  });

  const addLike = async () => {
    await likeComments.mutateAsync(_id, authId);
    setIsCommentLiked((prev) => !prev);
    isCommentLiked
      ? setLikeComment((prev) => prev - 1)
      : setLikeComment((prev) => prev + 1);
  };

  // delete comment
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(removeComment, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  const handleDelete = () => {
    mutate(_id);
    setComment({ ...comment });
  };

  if (isLoading) return "Loading...";
  if (isError) return "Something went Wrong!!!";

  return (
    <div className="comments">
      <div className="comment">
        <img
          src={userImg ? folder + userImg : folder + "static/profile.png"}
          alt="userIMage"
        />

        <div className="comment_body">
          <h1 style={{ textTransform: "capitalize" }}>
            {username}
            <span style={{ textTransform: "lowerCase" }}>
              {moment(createdAt).fromNow()}
            </span>
          </h1>
          <p>{commentText}</p>

          <div className="reactions">
            <span className="like" onClick={addLike}>
              {isCommentLiked ? (
                <ThumbUpAltIcon className="icon" />
              ) : (
                <ThumbUpOffAltOutlinedIcon className="icon" />
              )}
              {likeComment}
            </span>

            <span className="reply">replay</span>

            {authId === userId || postUserId === authId ? (
              <button onClick={handleDelete}>remove</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
