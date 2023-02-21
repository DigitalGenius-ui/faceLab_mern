import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./pages/User/User";
import Auth from "./pages/Auth/Auth";
import { FaceLab } from "./context/Context";
import DetailsForm from "./pages/User/UserDetails/DetailsForm/DetailsForm";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const { isAuth } = FaceLab();
  const API = axios.create({ baseURL: "http://localhost:5000" });

  useEffect(() => {
    API.interceptors.request.use((req) => {
      if (localStorage.getItem("user")) {
        req.headers.authorization = `Bearer ${
          JSON.pars(localStorage.getItem("user")).accessToken
        }`;
      }
      console.log(req);
      return req;
    });
  }, [API.interceptors.request]);

  return (
    <div className="App">
      {isAuth && <Header />}
      <Routes>
        {isAuth && <Route path="/" element={<Home />} />}
        {isAuth && <Route path="/:id/user" element={<User />} />}
        {isAuth && <Route path="/:id/form" element={<DetailsForm />} />}
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/auth"} />} />
      </Routes>
    </div>
  );
}

export default App;
