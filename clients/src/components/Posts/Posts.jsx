import React from "react";
import "./Posts.scss";
import SinglePost from "./SinglePosts/SinglePost";
import { FaceLab } from "../../context/Context";

const Posts = () => {
  const { posts: data, isLoading, isError } = FaceLab();

  if (isLoading) return "Loading...";
  if (isError) return "something went wrong";

  const sortData = data?.sort((a, b) => a.createdAt < b.createdAt);
  return (
    <div className="posts">
      {data && sortData?.map((post, i) => <SinglePost data={post} key={i} />)}
    </div>
  );
};

export default Posts;
