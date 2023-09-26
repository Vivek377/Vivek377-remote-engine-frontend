import React from "react";
import { Navigate } from "react-router-dom";

const Empty = () => {
  return <Navigate to={"/signup"} />;
};

export default Empty;
