import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SingleNav.scss";

const SingleNav = ({ icon, path, name, profile }) => {
  const [selected, setSelected] = useState("/");
  const navigate = useNavigate();

  const handleClick = () => {
    setSelected(path);
    navigate(path);
    window.location.reload();
  };
  return (
    <div className="navigation">
      <div
        onClick={handleClick}
        className={`nav ${selected === path ? "active" : ""}`}
      >
        <span>{icon}</span>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default SingleNav;
