import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ setIsLoggedIn }) {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiariesCount, setBeneficiariesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/beneficiaries", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setBeneficiaries(response.data.beneficiaries);
        setBeneficiariesCount(response.data.count);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Network error, please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading beneficiaries...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Total Beneficiaries: {beneficiariesCount}</p>

      {errorMessage && <div className="error">{errorMessage}</div>}

      <div>
        <h3>Beneficiaries List:</h3>
        <ul>
          {beneficiaries.map((beneficiary) => (
            <li key={beneficiary._id}>
              {beneficiary.name} - {beneficiary.email} {/* Customize based on beneficiary data */}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
