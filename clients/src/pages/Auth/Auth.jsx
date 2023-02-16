import React, { useState } from "react";
import "./Auth.scss";
import { TextField, Button } from "@mui/material";
import { useMutation } from "react-query";
import { FaceLab } from "../../context/Context";
import { register, signIn } from "../../fetchHook/userFetch";

const Auth = () => {
  const [authChange, setAuthChange] = useState(false);
  const { login, setLogin, signUp, setSignUp } = FaceLab();

  const { mutate, isLoading, isError } = useMutation(
    authChange ? register : signIn,
    {
      onSuccess: (data) => {
        return data;
      },
    }
  );

  if (isLoading) return "Loading...";
  if (isError) return "something went wrong";

  const submit = (e) => {
    e.preventDefault();

    if (authChange) {
      mutate(signUp);
      setAuthChange(false);
    } else {
      mutate(login);
    }
  };

  console.log(authChange);

  return (
    <div className="auth_container">
      <div className="contents">
        <h1 className="title">{authChange ? "Sign Up" : "Sign In"}</h1>

        <form className="form" onSubmit={submit}>
          {authChange ? (
            <>
              <TextField
                value={signUp.username}
                onChange={(e) =>
                  setSignUp({ ...signUp, username: e.target.value })
                }
                type="text"
                label="Username"
                size="small"
              />
              <TextField
                value={signUp.email}
                onChange={(e) =>
                  setSignUp({ ...signUp, email: e.target.value })
                }
                type="email"
                label="Email"
                size="small"
              />
              <TextField
                value={signUp.password}
                onChange={(e) =>
                  setSignUp({ ...signUp, password: e.target.value })
                }
                type="password"
                label="Password"
                size="small"
              />
              <TextField
                value={signUp.rePassword}
                onChange={(e) =>
                  setSignUp({ ...signUp, rePassword: e.target.value })
                }
                type="password"
                label="Re-Password"
                size="small"
              />
              <Button
                type="submit"
                className="btn"
                variant="outlined"
                color="primary"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <TextField
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
                type="text"
                label="Username"
                size="small"
              />
              <TextField
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                type="password"
                label="Password"
                size="small"
              />
              <Button
                type="submit"
                className="btn"
                variant="outlined"
                color="primary"
              >
                Login
              </Button>
            </>
          )}
        </form>
        <div onClick={() => setAuthChange(!authChange)} className="auth_change">
          {!authChange
            ? "If you don't have an account click here to sign up"
            : "If you have an account click here to sign in"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
