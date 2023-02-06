import React from "react";
import { Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";

import Homepage from "./componets/Homepage/Homepage";
import AboutUs from "./componets/AboutUs/AboutUs";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./componets/Login/Login";
import Profile from "./componets/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}>
        <Route index element={<AboutUs />} />
        <Route path="sign-in" element={<Login />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
