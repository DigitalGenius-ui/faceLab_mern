import React from "react";
import "./UserDetails.scss";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useNavigate } from "react-router-dom";
import { FaceLab } from "../../../context/Context";

const UserDetails = () => {
  const { data, isAuth, setUpdateProfile } = FaceLab();
  const authName = isAuth.username;
  const navigate = useNavigate();

  const updatePage = (data) => {
    setUpdateProfile(data);
    navigate(`/${data._id}/form`);
  };

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="user_details white_bg">
      <div className="details_head">
        <h1>User Info</h1>
        {authName === data.username && (
          <span className="icon" onClick={() => updatePage(data)}>
            <ModeEditOutlinedIcon />
          </span>
        )}
      </div>

      <div className="details_body">
        <div className="info">
          <h1>born : </h1>
          <span>{data.born}</span>
        </div>
        <div className="info">
          <h1>Status </h1>
          <span>{data.status}</span>
        </div>
        <div className="info">
          <h1>live </h1>
          <span>{data.location}</span>
        </div>
        <div className="info">
          <h1>works at </h1>
          <span>{data.work}</span>
        </div>
      </div>
      {authName === data.username && (
        <div className="user_btn">
          <button onClick={logOut}>LogOut</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
