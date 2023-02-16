import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchPost } from "../fetchHook/postFetch";
import { fetchSingleUser, getAllUsers } from "../fetchHook/userFetch";

const FaceContext = createContext();

const Context = ({ children }) => {
  // auth part
  const [isAuth, setISAuth] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  // getAll posts 
  const { search } = useLocation();
  const { data:posts } = useQuery("posts", () =>
    fetchPost(search)
  );

  // add post
  const [formData, setFormData] = useState({
    username: isAuth?.username,
    userId: isAuth?._id,
    description: "",
    postImg: "",
  });
  const [file, setFile] = useState("");

  // show feature submenu
  const [showUser, setShowUser] = useState(false);

  // get all users 
  const { data: postUsers } = useQuery("users", getAllUsers);
  
  // fetch single user
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const { data, isLoading, isError } = useQuery("singleUser", () =>
    fetchSingleUser(id)
  );

  // update profile data
  const [updateProfile, setUpdateProfile] = useState({
    username: "",
    email: "",
    userImg: "",
    userBanner: "",
    position: "",
    born: "",
    status: "",
    location: "",
    work: "",
  });

  return (
    <FaceContext.Provider
      value={{
        isAuth,
        setISAuth,
        login,
        setLogin,
        signUp,
        setSignUp,
        showUser,
        setShowUser,
        // single user 
        data,
        isLoading,
        isError,
        // allUsers
        postUsers,
        // add posts
        formData,
        setFormData,
        file,
        setFile,
        // getAll posts 
        posts,
        // update profile
        updateProfile,
        setUpdateProfile,

      }}
    >
      {children}
    </FaceContext.Provider>
  );
};

export default Context;

export const FaceLab = () => useContext(FaceContext);
