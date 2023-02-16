import { TextField } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useMutation, useQueryClient } from "react-query";
import { commentPost } from "../../../../fetchHook/postFetch";

const AddComment = ({ setComment, comment, postData }) => {
  // handle comments
  const _id = postData._id;
  const data = { _id, comment };

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(commentPost, {
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });

  const handleSubmit = () => {
    data &&
      setComment({
        ...comment,
        commentText: "",
      })
    mutate(data);
  };

  if (isLoading) return "Loading...";
  if (isError) return "Something went wrong!!!";

  return (
    <div className="input">
      <TextField
        fullWidth
        label="Comment..."
        size="small"
        value={comment.commentText}
        onChange={(e) =>
          setComment({ ...comment, commentText: e.target.value })
        }
      />
      <button onClick={handleSubmit}>
        <SendIcon className="icon" />
      </button>
    </div>
  );
};

export default AddComment;
