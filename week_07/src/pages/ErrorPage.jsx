import React from "react";
import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>OOps! An Error Occurred.</h1>
      {error && <p>{error.data}</p>}
      <NavLink to="/">
        <button>Go Home</button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
