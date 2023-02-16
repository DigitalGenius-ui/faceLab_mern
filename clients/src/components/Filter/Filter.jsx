import React from 'react';
import "./Filter.scss";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const Filter = () => {
  return (
    <div className="filter_btn">
      <div className="btn">
        <span>
          <FilterListOutlinedIcon className="icon" />
        </span>
        <p>filter</p>
      </div>
      <div className="btn">
        <span>
          <FilterAltOutlinedIcon className="icon" />
        </span>
        <p>sort by</p>
      </div>
    </div>
  );
}

export default Filter