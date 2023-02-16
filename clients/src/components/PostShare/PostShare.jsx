import React, { useRef } from "react";
import "./PostShare.scss";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../../fetchHook/postFetch";
import CloseIcon from "@mui/icons-material/Close";
import { FaceLab } from "../../context/Context";

const PostShare = () => {
  const imageRef = useRef(null);
  const { formData, setFormData, file, setFile, isAuth } = FaceLab();
  const { userImg } = isAuth;
  const folder = process.env.React_App_PF;

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(createPost, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  if (isLoading) return "Loading...";
  if (isError) return "Error...";

  const addPost = () => {
    const data = {
      file,
      formData,
    };
    mutate(data);
    setFormData({ ...formData, description: "" });
    setFile("");
  };

  return (
    <div className="share_post">
      <div className="flex">
        <div className="post_left">
          <img
            src={userImg ? folder + userImg : folder + "static/profile.png"}
            alt="profile"
          />
        </div>

        <div className="post_right">
          <div className="input">
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Start making your post"
              cols="10"
              rows="3"
            ></textarea>
          </div>
        </div>

        <Button
          onClick={addPost}
          variant="contained"
          className="send_btn"
          size="small"
        >
          <SendIcon className="send" />
        </Button>
      </div>

      {file && (
        <div className="file_img">
          <button onClick={() => setFile("")}>
            <CloseIcon />
          </button>
          <img src={URL.createObjectURL(file)} alt="this is an imag" />
        </div>
      )}

      <div className="btn_container">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={imageRef}
          type="file"
          className="input"
        />

        <div className="btn" onClick={() => imageRef.current.click()}>
          <ImageOutlinedIcon className="post_icons" />
          <p>
            <span>upload</span> image
          </p>
        </div>

        <div className="btn">
          <UploadFileOutlinedIcon className="post_icons" />
          <p>
            <span>upload</span> file
          </p>
        </div>

        <div className="btn">
          <VideocamOutlinedIcon className="post_icons" />
          <p>
            <span>upload</span> video
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostShare;
