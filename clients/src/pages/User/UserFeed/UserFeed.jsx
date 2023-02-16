import React from "react";
import Profile from "./Profile/Profile";
import PostShare from "../../../components/PostShare/PostShare";
import "./UserFeed.scss";
import { FaceLab } from "../../../context/Context";

const UserFeed = () => {
  const { isAuth, data } = FaceLab();
  return (
    <div className="user_feed">
      <Profile />
      {isAuth.username === data.username && <PostShare />}
    </div>
  );
};

export default UserFeed;
