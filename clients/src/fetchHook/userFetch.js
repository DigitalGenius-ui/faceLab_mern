import axios from "axios";

const BASE_URL = "http://localhost:5000";

// sign up
export const register = async (data) => {
  try {
    await axios.post(BASE_URL + "/api/user/register", data);
  } catch (error) {
    console.log(error);
  }
};

// sign in
export const signIn = async (data) => {
  try {
    const user = await axios.post(BASE_URL + "/api/user/login", data);
    localStorage.setItem("user", JSON.stringify(user.data));
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

// update profile
export const updateProfileDetails = async (data) => {
  if (data.profileImg) {
    const formData = new FormData();
    const imgName = Date.now() + data.profileImg.name;
    formData.append("name", imgName);
    formData.append("file", data.profileImg);
    data.updateProfile.userImg = imgName;

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
    } catch (error) {
      console.log(error);
    }
  }

  if (data.profileBanner) {
    const formData = new FormData();
    const imgName = Date.now() + data.profileBanner.name;
    formData.append("name", imgName);
    formData.append("file", data.profileBanner);
    data.updateProfile.userBanner = imgName;

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
    } catch (error) {
      console.log(error);
    }
  }
  try {
    await axios.put(
      `${BASE_URL}/api/user/update/${data.updateProfile._id}`,
      data.updateProfile
    );
    localStorage.setItem("user", JSON.stringify(data.updateProfile));
  } catch (error) {
    console.log(error);
  }
};

// get all user
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/user`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// get single user
export const fetchSingleUser = async (id) => {
  try {
    const res = await axios.get(BASE_URL + `/api/user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// get all user friends
export const getFriends = async (id) => {
  try {
    const friends = await axios.get(`${BASE_URL}/api/user/friends/${id}`);
    return friends.data;
  } catch (error) {
    console.log(error)
  }
}

// follow and unFollow user
export const follow = async (id, userId) => {
  try {
    await axios.put(`${BASE_URL}/api/user/follow/${id}`, {userId});
  } catch (error) {
    console.log(error);
  }
};

export const unFollow = async (id, userId) => {
  try {
    await axios.put(`${BASE_URL}/api/user/unfollow/${id}`, {userId});
  } catch (error) {
    console.log(error);
  }
};
