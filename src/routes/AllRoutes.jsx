import React from "react";
import { Routes, Route } from "react-router-dom";
import Verify from "../pages/Verify";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Reset from "../pages/Reset";
import PrivateRoute from "./PrivateRoute";
import Empty from "../pages/Empty";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Empty />} />
        <Route path="/reset" element={<Reset />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
