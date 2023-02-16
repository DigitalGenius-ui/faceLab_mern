import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SingleNav.scss";

const SingleNav = ({ icon, path, name, selected, setSelected }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setSelected(name);
    navigate(path);
    window.location.reload();
  }
  return (
      <div className='navigation'>
          <div
          onClick={handleClick} className={`nav ${selected === name ? "active" : ""}`}>
              <span>{icon}</span>
              <p>{name }</p>
          </div>
    </div>
  )
}

export default SingleNav