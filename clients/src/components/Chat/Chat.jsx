import React from 'react';
import "./Chat.scss";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import UserChat from './UserChat/UserChat';
import { FaceLab } from "../../context/Context";

const Chat = () => {
  const { isAuth } = FaceLab();
  const PF = process.env.React_App_PF;
  const data = [
    {
      id : 1,
      name : "John Smith",
      image : "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
      text : "Okay I will let you...",
      isActive:false,
      newMessage : false
    },
    {
      id : 2,
      name : "Sarah Jack",
      image : "https://img.freepik.com/free-photo/portrait-young-woman-with-passport_1258-48213.jpg",
      text : "I think I am going to...",
      isActive:true,
      newMessage : true
    },
    {
      id : 3,
      name : "James Paul",
      image : "https://img.freepik.com/free-photo/photo-as-passport-young-man-with-stylish-haircut_295783-869.jpg?w=2000",
      text : "I got what you said...",
      isActive:false,
      newMessage : false
    }
  ]

  return (
    <div className="user__chat">
      <div className="chat__head">
        <div className="chat__image">
          <img
            src={isAuth.userImg ? PF + isAuth.userImg : PF + "static/profile.png"}
            alt="userImage"
          />
        </div>
        <div className="chat__icon">
          <span>
            <BorderColorOutlinedIcon className="icon" />
          </span>
          <span>
            <MoreHorizOutlinedIcon className="icon" />
          </span>
        </div>
      </div>
      {/* chat user  */}
      <div className="chats">
        {data.map((user, i) => (
          <UserChat user={user} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Chat