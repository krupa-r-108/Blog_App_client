import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
