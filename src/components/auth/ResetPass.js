import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../apiCall";
import toast, { Toaster } from "react-hot-toast";

const ResetPass = ({ match }) => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const resetPassHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      await axios.put(
        `${baseUrl}/api/users/password/reset/${token}`,
        { password, confirmPassword },
        config
      );

      setLoading(false);
      toast.success("Password reset done!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setLoading(false);
      toast.error(`${error.response.data}`);
    }
  };
  return (
    <>
      {" "}
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
        }}
      />
      <div style={{ textAlign: "center" }}>
        <h1>Reset Password</h1>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="New Password"
        />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
        <button onClick={resetPassHandler} disabled={loading ? true : false}>
          Submit
        </button>
        <p style={{ color: "red" }}></p>
        <div>
          <Link to="/">Login Page</Link>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
