import React from "react";
import { useLocation } from "react-router-dom";
import Error404 from "../components/organisms/Error404";
import Error403 from "../components/organisms/Error403";
import Error500 from "../components/organisms/Error505";

const ErrorPage = () => {
  const location = useLocation();

  if (location.pathname === "/403") return <Error403 />;
  if (location.pathname === "/500") return <Error500 />;

  return <Error404 />;
};

export default ErrorPage;
