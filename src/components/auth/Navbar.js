import React from "react";
import { Typography, AppBar, Toolbar, Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const history = useHistory();
  const logoutHandler = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
        }}
      />
      <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">Shortly</Typography>
          <Box ml="auto">
            <Button color="inherit">Welcome {user.firstName}!</Button>
            <Button color="inherit">Links</Button>
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
