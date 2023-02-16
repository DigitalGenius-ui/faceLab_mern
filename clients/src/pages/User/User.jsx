import React from "react";
import Posts from "../../components/Posts/Posts";
import { FaceLab } from "../../context/Context";
import "./User.scss";
import UserDetails from "./UserDetails/UserDetails";
import UserFeed from "./UserFeed/UserFeed";
import UserFriends from "./UserFriends/UserFriends";

const User = () => {
  const { isLoading, isError } = FaceLab();

  if (isLoading) return "loading...";
  if (isError) return "something went wrong!!!";

  return (
    <div className="user_container">
      <div className="left">
        <UserDetails />
      </div>

      <div className="center">
        <UserFeed />
        <div className="posts">
          <Posts />
        </div>
      </div>

      <div className="right">
        <UserFriends />
      </div>

    </div>
  );
};

export default User;
