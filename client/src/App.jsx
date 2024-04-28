import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import axios from "axios";
import Dashboard from "./pages/Dashboard.jsx";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="w-screen h-screen">
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
