import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./AuthPage.module.css";

import { Button, TextField, Box, Typography } from "@mui/material";

export default function AuthPage() {
  const navigate = useNavigate();

  const [loginMode, setLoginMode] = useState(true);
  const signInLabel = loginMode ? "Sign In" : "Sign Up";
  const newUserLabel = loginMode ? "New User?" : "Back to Sign In";

  const [error, setError] = useState("");

  interface submitData {
    username: string;
    password: string;
    retypedPassword?: string;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submittedData: submitData = {
      username: (data.get("username") as string)!.replace(/\s/g, ""),
      password: (data.get("password") as string)!.replace(/\s/g, ""),
    };

    if (!loginMode) {
      submittedData.retypedPassword = (data.get(
        "retypedPassword"
      ) as string)!.replace(/\s/g, "");
    }

    console.log(submittedData);

    if (
      // input validation
      submittedData.username.length > 0 &&
      submittedData.password.length > 0 &&
      (loginMode || submittedData.password === submittedData.retypedPassword)
    ) {
      setError("");
      // loginMode ? loginHandler(submittedData) : signupHandler(submittedData);
      navigate("/rate"); // Comment out when backend is ready
    } else {
      setError("Invalid username or password.");
    }
  };

  const loginHandler = async (submittedData: submitData) => {
    try {
      const res = await fetch("{% url 'api:user-login' %}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: submittedData.username,
          password: submittedData.password,
        }),
      });
      let status = await res.json();
      if (status.message) {
        setError("Invalid username or password.");
      } else {
        console.log("SUCCESS");
        setError("");
        navigate("/rate");
      }
    } catch (err) {
      setError("Invalid username or password.");
      console.log(err);
    }
  };

  const signupHandler = async (submittedData: submitData) => {
    try {
      const res = await fetch(
        "https://project1cs3300.ue.r.appspot.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: submittedData.username,
            password: submittedData.password,
          }),
        }
      );
      let status = await res.json();
      if (status.message === "user already exists") {
        console.log(status);
        setError("User already exists.");
      } else {
        console.log("SUCCESS");
        setError("");
        setLoginMode(true);
      }
    } catch (err) {
      setError("User already exists.");
      console.log(err);
    }
  };

  const switchModeHandler = () => {
    setLoginMode((loginMode) => !loginMode);
    setError("");
  };

  return (
    <div className={styles.bg}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "25%",
          height: "50%",
          background: "rgba(0,0,0,0.90)",
          padding: "5%",
          boxShadow: "0 10px 50px 5px rgba(206,108,2,1)",
          borderRadius: "10px",
          marginLeft: "3%",
        }}
      >
        <Typography component="h1" variant="h5" color={"White"}>
          CineMatch
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          {!loginMode && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="retypedPassword"
              label="Retype Password"
              type="password"
              id="retypedPassword"
            />
          )}

          <Typography component="h1" variant="h5" color={"White"}>
            {error}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {signInLabel}
          </Button>
        </Box>

        <Button type="submit" variant="text" onClick={switchModeHandler}>
          {newUserLabel}
        </Button>
      </Box>
    </div>
  );
}
