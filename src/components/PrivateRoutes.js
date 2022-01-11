import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("userInfo") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </>
  );
};

export default PrivateRoutes;
