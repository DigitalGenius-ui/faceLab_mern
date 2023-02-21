import axios from "axios";

const BASE_URL = "http://localhost:5000";

// get all posts
export const fetchPost = async (search) => {
  try {
    const res = await axios.get(BASE_URL + `/api/post/${search}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// create new post
export const createPost = async (data) => {
  if (data.file) {
    const form = new FormData();
    const imageName = Date.now() + data.file.name;
    form.append("name", imageName);
    form.append("file", data.file);
    data.formData.postImg = imageName;

    try {
      await axios.post(BASE_URL + "/api/upload", form);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await axios.post(BASE_URL + "/api/post/create", data.formData);
  } catch (error) {
    console.log(error);
  }
};

// delete post
export const removePost = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/post/delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};

// like and disLike post
export const likeDislike = async (id, userId) => {
  try {
    await axios.put(`${BASE_URL}/api/post/${id}/like`, { userId });
  } catch (error) {
    console.log(error);
  }
};

// comment in post
export const commentPost = async (data) => {
  try {
    await axios.post(`${BASE_URL}/api/comment/${data._id}`, data.comment);
  } catch (error) {
    console.log(error);
  }
};

// delete comment
export const removeComment = async (_id) => {
  try {
    await axios.delete(`${BASE_URL}/api/comment/remove/${_id}`);
  } catch (error) {
    console.log(error.message);
  }
};

// like and disLike comment
export const commentLike = async (_id, userId) => {
  try {
    await axios.put(`${BASE_URL}/api/comment/like/${_id}`, { userId });
  } catch (error) {
    console.log(error.message);
  }
};
