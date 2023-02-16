import React from "react";
import Filter from "../Filter/Filter";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./Feed.scss";

const Feed = () => {
  return (
    <>
      <PostShare />
      <Filter />
      <Posts />
    </>
  );
};

export default Feed;
