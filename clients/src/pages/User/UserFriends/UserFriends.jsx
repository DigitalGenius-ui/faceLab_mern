import React from "react";
import "./UserFriends.scss";
import { useQuery } from "react-query";
import { getFriends } from "../../../fetchHook/userFetch";
const UserFriends = ({ data: user }) => {
  const PF = process.env.React_App_PF;

  const {
    data: userFriends,
    isLoading,
    isError,
  } = useQuery("friends", () => getFriends(user._id));

  if (isLoading) return "Loading...";
  if (isError) return "Something went Wrong";

  return (
    <div className="user_friends white_bg">
      <h1>Who is following you :</h1>
      {userFriends?.map((friend, i) => (
        <div className="friend" key={i}>
          <div className="friend_info">
            <img
              src={
                friend.userImg
                  ? PF + friend.userImg
                  : PF + "/static/profile.png"
              }
              alt="friendsImg"
            />
            <div>
              <h1>{friend.username}</h1>
              <span>@username</span>
            </div>
          </div>
          <button className="user_button">follow</button>
        </div>
      ))}
    </div>
  );
};

export default UserFriends;
