import React, { useState } from "react";
import { useMutation } from "react-query";
import { likeDislike } from "../../../../fetchHook/postFetch";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { FaceLab } from "../../../../context/Context";

const LikePost = ({ data, setLikePost, setShowComment }) => {
  const { isAuth } = FaceLab();
  const { _id: userId } = isAuth;
  const [isLiked, setIsLiked] = useState(data.likes.includes(userId));

  const postLike = useMutation(() => likeDislike(data._id, userId), {
    onSuccess: (data) => {
      return data;
    },
  });

  const liked = async () => {
    setIsLiked(prev => !prev);
    await postLike.mutateAsync(data._id, userId);
    userId &&
      (isLiked
        ? setLikePost((prev) => prev - 1)
        : setLikePost((prev) => prev + 1));
  };
  
  return (
    <>
      <div className="button">
        <button className={`${isLiked ? "active" : ""}`} onClick={liked}>
          {isLiked ? (
            <ThumbUpAltIcon className="icon" />
          ) : (
            <ThumbUpOffAltOutlinedIcon className="icon" />
          )}
          Like
        </button>
      </div>
      <div className="button flex">
        <button onClick={() => setShowComment(prev => !prev)}>
          <ChatBubbleOutlineOutlinedIcon className="icon" /> Comment
        </button>
      </div>
      <div className="button">
        <button>
          <ShareOutlinedIcon className="icon" /> Share
        </button>
      </div>
    </>
  );
};

export default LikePost;
