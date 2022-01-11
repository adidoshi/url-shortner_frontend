import React, { useState } from "react";
import { Typography, Button, Box, Grid, Hidden } from "@material-ui/core";
import bgimg1 from "../../assets/bgimg1.jpg";
import LoginSignupModal from "./LoginSignupModal";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
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
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      {openAuthModal && (
        <LoginSignupModal
          toast={toast}
          onClose={() => setOpenAuthModal(false)}
        />
      )}
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        boxSizing="border-box"
        height="100vh"
        bgcolor="#56B7BA"
        color="white">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Splash</Typography>
          <Button onClick={() => setOpenAuthModal(true)} color="inherit">
            Login/Signup
          </Button>
        </Box>

        <Box display="flex" flexGrow={1} alignItems="center">
          <Grid container alignItems="center">
            <Grid item sm={6}>
              <Box>
                <Typography variant="h4">
                  Short links, by just one click
                </Typography>
                <Box my={2}>
                  <Typography>
                    Link shortner to help you with your social handles in
                    profile description and your brand to grow...
                  </Typography>
                </Box>
                <Button
                  onClick={() => setOpenAuthModal(true)}
                  size="large"
                  variant="contained"
                  disableElevation>
                  Get Started
                </Button>
              </Box>
            </Grid>
            <Hidden only="xs">
              <Grid item sm={6}>
                <img
                  style={{ width: "100%", borderRadius: "10px" }}
                  src={bgimg1}
                  alt="bgimg"
                />
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
