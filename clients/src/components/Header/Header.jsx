import React, { useState } from "react";
import "./Header.scss";
import FitbitIcon from "@mui/icons-material/Fitbit";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <div className="contents">
        <div className="logo">
          <FitbitIcon className="logo__icon" />
          <h1>facelab</h1>
        </div>

        <div className="header__right">
          <div className="search">
            <div className={`input ${showSearch ? "active" : ""}`}>
              <input type="text" placeholder="search..." />
              <span className="secondSearch">
                <SearchIcon />
              </span>
            </div>
            <span
              onClick={() => setShowSearch(false)}
              className={`shadow ${showSearch ? "active" : ""}`}
            ></span>

            <span onClick={() => setShowSearch(!showSearch)}>
              <SearchIcon />
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
