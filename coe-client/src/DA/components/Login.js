// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Backendapi from "../../Backendapi";
// import "./DA.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     try {
//       const response = await axios.post(`${Backendapi.REACT_APP_BACKEND_API_URL}/api/login`, {
//         username,

//         password,
//       });

//       const { role } = response.data; // Assuming the role is present in the response data

//       console.log(response.data); // Handle the response data as needed

//       // Redirect to the desired page after successful login

//       navigate("/checklist", { state: { role } });
//     } catch (error) {
//       setError("Invalid username or password");
//       console.error(error);
//     }
//   };

//   const handleForgotPassword = () => {
//     // Redirect to the password reset page
//     navigate("/PasswordReset");
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">DA Login</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           type="text"
//           value={username}
//           onChange={handleUsernameChange}
//           placeholder="Username"
//           className="login-input"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//           placeholder="Password"
//           className="login-input"
//         />
//         <button type="submit" className="login-button">
//           Login
//         </button>
//       </form>

//        {/* Add the "Forgot Password" link */}
//        <button onClick={handleForgotPassword} className="forgotpassword">
//         Forgot Password
//       </button>

//       {error && <p className="login-error">{error}</p>}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Backendapi from "../../Backendapi";
import "./DA.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("checklist"); // Default to "checklist" option
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Backendapi.REACT_APP_BACKEND_API_URL}/api/login`,
        {
          username,
          password,
        }
      );

      const { role } = response.data; // Assuming the role is present in the response data

      console.log(response.data); // Handle the response data as needed

      // Redirect to the desired page after successful login based on the selectedOption
      if (selectedOption === "checklist") {
        navigate("/checklist", { state: { role } });
      } else if (selectedOption === "postchecklist") {
        navigate("/postChecklist", { state: { role } });
      }
    } catch (error) {
      setError("Invalid username or password");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">DA Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Add radio buttons for selecting the checklist type */}
        <div className="radio-container">
          <label>
            <input
              type="radio"
              value="checklist"
              checked={selectedOption === "checklist"}
              onChange={handleOptionChange}
            />
           Pre Checklist
          </label>
          <label>
            <input
              type="radio"
              value="postchecklist"
              checked={selectedOption === "postchecklist"}
              onChange={handleOptionChange}
            />
            Post Checklist
          </label>
        </div>

        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;

