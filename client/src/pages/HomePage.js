import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

function HomePage({ token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Welcome to Timetable Generator</h1>
      <Login setToken={setToken} />
      <Register />
    </div>
  );
}

export default HomePage;
