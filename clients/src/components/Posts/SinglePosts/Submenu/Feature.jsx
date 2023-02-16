import React from "react";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useMutation, useQueryClient } from "react-query";
import { removePost } from "../../../../fetchHook/postFetch";
import { FaceLab } from "../../../../context/Context";

const Feature = ({ username, _id, setShowFeature }) => {
  const { isAuth } = FaceLab();
  const user = isAuth.username;

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(removePost, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  const deletePost = () => {
    mutate(_id);
    setShowFeature(false);
  };

  if (isLoading) return "Loading...";
  if (isError) return "Something went Wrong";

  return (
    <>
      {user === username ? (
        <>
          <div onClick={deletePost} className="user_btn">
            <DeleteIcon className="icon" /> remove post
          </div>
          <div className="user_btn">
            <ModeEditIcon className="icon" /> edit post
          </div>
        </>
      ) : (
        <>
          <div className="user_btn">
            <ReportOutlinedIcon className="icon" /> report post
          </div>
          <div className="user_btn">
            <PersonRemoveOutlinedIcon className="icon" /> unfollow
          </div>
          <div className="user_btn">
            <SendOutlinedIcon className="icon" /> send message
          </div>
        </>
      )}
    </>
  );
};

export default Feature;
