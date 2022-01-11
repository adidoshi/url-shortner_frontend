import { Box, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <>
      <Box
        sx={{
          mx: "auto",
          bgcolor: "primary.main",
          color: "#fff",
          width: 500,
          p: 2,
          m: 1,
          borderRadius: 4,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "220px",
          fontSize: "18px",
        }}>
        <p>
          Email sent to you registered email ID. Check your inbox and verify
          your email, to login into your account.
        </p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button disableElevation variant="contained" color="secondary">
            Sign In
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default VerifyEmail;
