import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../apiCall";

const LoginSignupModal = ({ onClose, toast }) => {
  const history = useHistory();
  const [isSignIn, setIsSignIn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        { email, password },
        config
      );
      setLoading(false);
      toast.success("Logged in successfully!");

      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/account");
    } catch (err) {
      setLoading(false);
      toast.error(`${err.response.data.message}`);
      setPassword("");
    }
  };

  const registerHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post(
        `${baseUrl}/api/users/register`,
        { firstName, lastName, email, password },
        config
      );
      history.push("/verifyEmail");
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassHandler = () => {
    setForgotPass(true);
  };

  const passHandleClose = () => {
    setForgotPass(false);
  };

  const forgotPassReq = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      await axios.post(
        `${baseUrl}/api/users/password/forgot`,
        { email },
        config
      );
      setLoading(false);
      toast.success("Email sent successfully!");
      setEmail("");
    } catch (error) {
      setLoading(false);
      setEmail("");
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open fullWidth onClose={onClose}>
        <Box display="flex" justifyContent="center" marginTop={1}>
          {loading && <CircularProgress color="primary" />}
        </Box>
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            Sign in
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {!isSignIn && (
            <>
              <TextField
                variant="filled"
                style={{ marginBottom: "24px" }}
                fullWidth
                label="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                variant="filled"
                style={{ marginBottom: "24px" }}
                fullWidth
                label="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <TextField
            style={{ marginBottom: "24px" }}
            variant="filled"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="filled"
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Box
            mb={1}
            mx={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%">
            <Typography
              onClick={() => setIsSignIn((o) => !o)}
              style={{ cursor: "pointer" }}>
              {isSignIn ? " Don't have an account" : "Already a member?"}
            </Typography>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              disabled={loading ? true : false}
              onClick={isSignIn ? loginHandler : registerHandler}>
              {isSignIn ? "Signin" : "Signup"}
            </Button>
          </Box>
        </DialogActions>
        {isSignIn && (
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={forgotPassHandler}>
            Forgot Password?
          </Button>
        )}

        {forgotPass && (
          <Dialog open={true} onClose={passHandleClose} fullWidth>
            <DialogTitle>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                Forgot Password
                <IconButton onClick={passHandleClose} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box mb={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Box mr={2} my={1}>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  disabled={loading ? true : false}
                  onClick={forgotPassReq}>
                  Send email
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        )}
      </Dialog>
    </>
  );
};

export default LoginSignupModal;
