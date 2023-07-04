import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove username from local storage
    localStorage.removeItem("password"); // Remove password from local storage
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <BrowserRouter>
      {/* <Header handleLogout={handleLogout} /> */}
      <Routes>
      <Route path="/" element={<Header handleLogout={handleLogout} />}></Route>
      <Route path="/Header" element={<Header handleLogout={handleLogout} />}></Route>
        <Route path="/Login" element={<Login handleLogout={handleLogout} />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;
