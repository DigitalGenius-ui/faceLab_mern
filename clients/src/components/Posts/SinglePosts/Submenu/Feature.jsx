import React, { useState } from "react";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useMutation, useQueryClient } from "react-query";
import { removePost } from "../../../../fetchHook/postFetch";
import { FaceLab } from "../../../../context/Context";
import { follow, unFollow } from "../../../../fetchHook/userFetch";

const Feature = ({ username, _id, setShowFeature, userId }) => {
  const { isAuth } = FaceLab();
  const user = isAuth.username;
  const [isFollowed, setIsFollowed] = useState(isAuth.follows.includes(userId));

  // follow user
  const followUsers = useMutation(() => follow(isAuth._id, userId), {
    onSuccess: (data) => {
      return data;
    }
  });

  const unFollowUsers = useMutation(() => unFollow(isAuth._id, userId), {
    onSuccess: (data) => {
      return data;
    }
  });

  const followUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (isFollowed) {
      await unFollowUsers.mutateAsync(isAuth._id, userId);
      localStorage.setItem("user",
      JSON.stringify({ ...user, follows:  isAuth.follows.filter((user) => user !== userId)}));
    } else {
      await followUsers.mutateAsync(isAuth._id, userId);
      localStorage.setItem("user", JSON.stringify({ ...user, follows: [...isAuth.follows, userId] }));
    }
    setIsFollowed(!isFollowed);
  };

  // remove post
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(removePost, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  const deletePost = () => {
    mutate(_id);
    setShowFeature(false);
  };

  if (isLoading) return "Loading...";
  if (isError) return "Something went Wrong";

  return (
    <>
      {user === username ? (
        <>
          <div onClick={deletePost} className="user_btn">
            <DeleteIcon className="icon" /> remove post
          </div>
          <div className="user_btn">
            <ModeEditIcon className="icon" /> edit post
          </div>
        </>
      ) : (
        <>
          <div className="user_btn">
            <ReportOutlinedIcon className="icon" /> report post
          </div>
          <div className="user_btn" onClick={followUser}>
            {isFollowed ? (
              <PersonRemoveOutlinedIcon className="icon" />
            ) : (
              <PersonAddAltIcon className="icon" />
            )}
            {isFollowed ? "unfollow" : "follow"}
          </div>
          <div className="user_btn">
            <SendOutlinedIcon className="icon" /> send message
          </div>
        </>
      )}
    </>
  );
};

export default Feature;
