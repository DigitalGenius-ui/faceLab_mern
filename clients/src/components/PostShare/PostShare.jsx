import React, { useRef, useState } from "react";
import "./PostShare.scss";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../../fetchHook/postFetch";
import CloseIcon from "@mui/icons-material/Close";
import { FaceLab } from "../../context/Context";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const PostShare = () => {
  const imageRef = useRef(null);
  const { formData, setFormData, file, setFile, isAuth } = FaceLab();
  const [showEmoji, setShowEmoji] = useState(false);

  const { userImg } = isAuth;
  const folder = process.env.React_App_PF;

  // add post 
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
    setShowEmoji(false)
  };

  // add emoji 
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setFormData({ ...formData, description: formData.description + emoji });
  }

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
            <span
              onClick={() => setShowEmoji(!showEmoji)}
              className="emoji_btn"
            >
              <MoodIcon />
            </span>
            <div className="emoji">
              {showEmoji && (
                <Picker
                  emojiSize={15}
                  emojiButtonSize={35}
                  showPreview={false}
                  data={data}
                  onEmojiSelect={(e) => addEmoji(e)}
                  theme="light"
                  maxFrequentRows={0}
                />
              )}
            </div>
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
