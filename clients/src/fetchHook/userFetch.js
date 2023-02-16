import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

// sign up
export const register = async (data) => {
  try {
    await axios.post(BASE_URL + "/register", data);
  } catch (error) {
    console.log(error);
  }
};

// sign in
export const signIn = async (data) => {
  try {
    const user = await axios.post(BASE_URL + "/login", data);
    localStorage.setItem("user", JSON.stringify(user.data));
    window.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

// get single user
export const fetchSingleUser = async (id) => {
  try {
    const res = await axios.get(BASE_URL + `/${id}`);
    return res.data;
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
      `${BASE_URL}/update/${data.updateProfile._id}`,
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
    const res = await axios.get(`${BASE_URL}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}