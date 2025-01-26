import React, { useState } from "react";
import axios from "axios";  // Import Axios for sending HTTP requests

const LoginForm = () => {
  const [id, setId] = useState("");        // State to store ID
  const [password, setPassword] = useState("");  // State to store Password
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [loading, setLoading] = useState(false); // State to show loading

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state to true

    try {
      // Make POST request to backend API with id and password
      const response = await axios.post("http://localhost:5000/login", {
        id,
        password,
      });

      // Handle success response
      console.log("Login successful:", response.data);
      // You can save the token or navigate the user to a different page
      localStorage.setItem("token", response.data.token);
      // Redirect or show success message
      alert("Login successful!");
    } catch (error) {
      // Handle error response
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)} // Update ID state
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
