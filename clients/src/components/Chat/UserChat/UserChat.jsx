import React from 'react';
import "./UserChat.scss";

const UserChat = (props) => {
    const { name, image, text, isActive, newMessage } = props.user;
  return (
      <div className='user__messages'>
          <div className="message">
              <div className="user__image">
                  <img src={image} alt="userImage" />
                  <span className={`online ${isActive ? "green" : ""}`}></span>
              </div>
              <div className="user__details">
                  <h1 className={newMessage && "newMessage"}>{name}</h1>
                  <p className={newMessage && "newMessage"}>{text }</p>
              </div>
          </div>
    </div>
  )
}

export default UserChat