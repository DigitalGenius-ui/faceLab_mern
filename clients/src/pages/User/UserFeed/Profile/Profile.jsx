import React from "react";
import { FaceLab } from "../../../../context/Context";
import "./Profile.scss";

const Profile = () => {
  const { data, posts } = FaceLab();
  const folder = process.env.React_App_PF;

  return (
    <div className="profile">
      <div className="banner">
        <img
          className="banner_img"
          src={
            data.userBanner
              ? folder + data.userBanner
              : folder + "static/faceBanner.png"
          }
          alt="banner"
        />

        <div className="profile_photo">
          <img
            src={
              data.userImg
                ? folder + data.userImg
                : folder + "static/profile.png"
            }
            alt="profilePic"
          />
        </div>
      </div>

      <div className="user_info">
        <div className="user_name">
          <h1>{data.username}</h1>
          <span>{data.position}</span>
        </div>
      </div>

      <div className="activities">
        <div className="activity">
          <h1>{data?.follows.length}</h1>
          <p>Followings</p>
        </div>

        <div className="activity">
          <h1>{data?.followers.length}</h1>
          <p>Followers</p>
        </div>
        <div className="activity">
          <h1>{posts?.length}</h1>
          <p>Posts</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
