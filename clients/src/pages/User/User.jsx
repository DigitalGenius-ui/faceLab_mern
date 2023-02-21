import React from "react";
import Posts from "../../components/Posts/Posts";
import { FaceLab } from "../../context/Context";
import "./User.scss";
import UserDetails from "./UserDetails/UserDetails";
import UserFeed from "./UserFeed/UserFeed";
import UserFriends from "./UserFriends/UserFriends";
import Navigation from "../../components/Navigation/Navigation";

const User = () => {
  const { isLoading, isError, data: singleUser, isAuth } = FaceLab();

  if (isLoading) return "loading...";
  if (isError) return "something went wrong!!!";

  return (
    <div className="user_container">
      <div className="left">
        <UserDetails />
        <div className="navBar">
          <Navigation />
        </div>
      </div>

      <div className="center">
        <UserFeed />
        <div className="posts">
          <Posts />
        </div>
      </div>

      <div className="right">
        {isAuth._id === singleUser._id && <UserFriends data={singleUser} />}
      </div>
    </div>
  );
};

export default User;
