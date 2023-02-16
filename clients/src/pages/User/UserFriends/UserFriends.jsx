import React from "react";
import "./UserFriends.scss";

const UserFriends = () => {
  const userFriends = [
    {
      name: "John Doe",
      username: "john1233444",
      img: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
    },
    {
      name: "John Doe",
      username: "john1233444",
      img: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
    },
    {
      name: "John Doe",
      username: "john1233444",
      img: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
    },
  ];
  return (
    <div className="user_friends white_bg">
      <h1>Who is following you :</h1>
      {userFriends.map((friend, i) => (
        <div className="friend" key={i}>
          <div className="friend_info">
            <img src={friend.img} alt="friendsImg" />
            <div>
              <h1>{friend.name}</h1>
              <span>@{friend.username}</span>
            </div>
          </div>
          <button className="user_button">follow</button>
        </div>
      ))}
    </div>
  );
};

export default UserFriends;
