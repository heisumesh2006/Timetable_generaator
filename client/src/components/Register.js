import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

function Register({ setUser }) { // accept setUser prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ username, password });
      alert(data.message);

      // Optionally, log user in after registering:
      setUser({ username }); 
      navigate("/dashboard"); // redirect to dashboard (or your home route)
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
