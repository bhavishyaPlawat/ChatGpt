/* frontend/src/AppRoutes.jsx */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat"; // Import the new Chat page
import Nav from "./components/Nav";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Nav />
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Nav />
              <Login />
            </>
          }
        />
        {/* Chat page usually has its own layout, so we don't wrap it with the standard Nav */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
