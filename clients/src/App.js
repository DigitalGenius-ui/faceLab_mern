import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import User from "./pages/User/User";
import Auth from "./pages/Auth/Auth";
import { FaceLab } from "./context/Context";
import DetailsForm from "./pages/User/UserDetails/DetailsForm/DetailsForm";

function App() {
  const { isAuth } = FaceLab();
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
