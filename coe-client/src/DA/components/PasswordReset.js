// In your frontend/src/components/PasswordReset.js file:

import React, { useState } from "react";
import axios from "axios";
import Backendapi from "../../Backendapi";

const PasswordReset = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`${Backendapi.REACT_APP_BACKEND_API_URL}/api/forgot-password`, {
        username,
      });

      const { password } = response.data;
      setResetPassword(password);
      setError("");
    } catch (error) {
      setError("User not found");
      setResetPassword("");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <button type="submit">Find Password</button>
      </form>

      {resetPassword && <p>Retrieved Password: {resetPassword}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PasswordReset;
