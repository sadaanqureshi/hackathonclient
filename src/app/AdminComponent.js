import React, { useState } from "react";
import axios from "axios";
import "./admincomponent.css";
import Dashboard from "./dashboard"; // Ensure the Dashboard component is imported

function AdminComponent() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear any previous error message

    try {
      const response = await axios.post("http://localhost:5000/admin/login", { adminId, password });

      // On successful login
      console.log("Authentication successful:", response.data);
      localStorage.setItem("token", response.data.token); // Save token in localStorage

      // Update the login state to render the Dashboard component
      setIsLoggedIn(true);

    } catch (error) {
      // Handle error response
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render the Dashboard if logged in
  if (isLoggedIn) {
    return <Dashboard setIsLoggedIn={setIsLoggedIn} />;
  }

  // Render the login form if not logged in
  return (
    <div className="admin-form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="adminId">Admin ID</label>
          <input
            type="text"
            id="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
}

export default AdminComponent;
