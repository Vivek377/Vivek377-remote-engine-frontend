import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  if (!isAuth) return <Navigate to={"/verify"} />;

  return children;
};

export default PrivateRoute;
