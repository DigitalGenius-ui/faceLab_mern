import React, { useState } from "react";
import "./SinglePost.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comment from "./Comment/Comment";
import { FaceLab } from "../../../context/Context";
import Feature from "./Submenu/Feature";
import { useNavigate } from "react-router-dom";
import LikePost from "./LikePost/LikePost";
import AddComment from "./Comment/AddComment";
import moment from "moment";

const SinglePost = (props) => {
  const {
    _id,
    username,
    userId: postUserId,
    description,
    postImg,
    likes,
    comments,
    createdAt,
  } = props.data;

  const [showFeature, setShowFeature] = useState(false);
  const [textLong, setTextLong] = useState(false);
  const { isAuth, postUsers } = FaceLab();

  const [showComment, setShowComment] = useState(false);

  const { _id: userId, username: authUser } = isAuth;
  const navigate = useNavigate();

  // the number of posts
  const [likePost, setLikePost] = useState(likes.length);

  // check if the post userId is the same as get all userId and display its image.
  const postUser =
    postUsers && postUsers?.find((user) => user._id === postUserId);

  const [comment, setComment] = useState({
    commentText: "",
    username: authUser,
    userId,
    userImg: isAuth.userImg,
  });

  const folder = process.env.React_App_PF;

  const pageNavigate = () => {
    // the postUserId and username must come from the post itself;
    navigate(`/${postUserId}/user?username=${username}`);
    window.location.reload();
  };

  return (
    <section className="post">
      {/* post head  */}
      <section className="post_head">
        <div className="post_user" onClick={pageNavigate}>
          <img
            src={
              postUser?.userImg
                ? folder + postUser?.userImg
                : folder + "static/profile.png"
            }
            alt="user"
          />
        </div>

        <div className="user_details">
          <div className="detail">
            <h1 style={{ textTransform: "capitalize" }}>
              {postUser?.username}
            </h1>
            <p className="time">
              <PublicOutlinedIcon className="icon" />
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>
        <span onClick={() => setShowFeature(!showFeature)} className="dot">
          <MoreHorizOutlinedIcon />
        </span>

        {/* feature submenu part  */}
        {showFeature && (
          <div className="user_features">
            <Feature
              username={postUser?.username}
              setShowFeature={ setShowFeature }
              _id={_id}
              userId={postUserId}
            />
          </div>
        )}
      </section>

      {/* post description  */}
      <section className="user_text">
        <p className="post_text">
          {description &&
            `${textLong ? description : description.substring(0, 220)}`}
          {description.length > 220 && (
            <button onClick={() => setTextLong(true)}>
              {textLong ? "" : "...see more"}
            </button>
          )}
        </p>
      </section>

      {/* post image  */}
      {postImg && (
        <div className="post_image">
          <img src={folder + postImg} alt="postImage" />
        </div>
      )}

      {/* like and comment counts  */}
      <section className="total_reaction">
        <div className="reaction">
          <ThumbUpOffAltOutlinedIcon className="icon" />
          <p>
            {likePost} <span>Likes</span>
          </p>
        </div>

        {/* comment count  */}
        <div className="reaction flex">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <p>
            {comments.length} <span>Comments</span>
          </p>
        </div>
        <ShareOutlinedIcon className="icon" />
      </section>

      {/* like post functionality  */}
      <section className="reaction_btns">
        <LikePost
          data={props.data}
          setLikePost={setLikePost}
          setShowComment={setShowComment}
        />
      </section>

      {/* comment part  */}
      {showComment && (
        <section className="comments">
          {comments.map((commentData, i) => (
            <Comment
              key={`${_id}- ${i}`}
              commentData={commentData}
              // all comments of the post
              allComments={comments}
              // postUserId
              postUserId={postUserId}
            />
          ))}

          {/* comment input  */}
          <AddComment
            // all post data
            postData={props.data}
            // comments state
            comment={comment}
            setComment={setComment}
          />
        </section>
      )}
    </section>
  );
};

export default SinglePost;
