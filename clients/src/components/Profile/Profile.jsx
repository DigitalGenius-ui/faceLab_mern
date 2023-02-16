import React from "react";
import "./Profile.scss";
import Navigation from "../Navigation/Navigation";
import { FaceLab } from "../../context/Context";

const Profile = () => {
  const { isAuth } = FaceLab();
  const { userImg, userBanner } = isAuth;
  const folder = process.env.React_App_PF;

  return (
    <div className="container">
      <div className="user__profile">
        <div className="banner">
            <img src={userBanner ? folder + userBanner : folder + "static/faceBanner.png"} alt="banner" />
        </div>
        <div className="user__image">
          <img src={userImg ? folder + userImg : folder + "static/profile.png"} alt="user" />
        </div>
        <div className="user__details">
          <h1>{isAuth.username}</h1>
          <p>@username</p>
        </div>
      </div>

      {/* navigation part  */}
      <div className="navBar">
        <Navigation />
      </div>
    </div>
  );
};

export default Profile;
