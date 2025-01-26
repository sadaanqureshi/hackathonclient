import React, { useState } from 'react';
import axios from 'axios';
import TokenComponent from './tokenComponent'; // Import TokenComponent

function ReceptionComponent() {
  const [cnic, setCnic] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [dept, setDept] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showToken, setShowToken] = useState(false); // State to control token display

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/reception/create', {
        cnic,
        name,
        phone,
        purpose,
        dept,
      });

      setResponseMessage('Data submitted successfully!');
    } catch (error) {
      setResponseMessage('Error submitting data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to show TokenComponent
  const handleShowToken = () => {
    setShowToken(true);
  };

  return (
    <div>
      {!showToken ? (
        <>
          <h2>Beneficiary Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="cnic">CNIC:</label>
              <input
                type="text"
                id="cnic"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="purpose">Purpose:</label>
              <input
                type="text"
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="dept">Department:</label>
              <input
                type="text"
                id="dept"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {responseMessage && <p>{responseMessage}</p>}

          {/* Show Token Button (Only after successful submission) */}
          {responseMessage === 'Data submitted successfully!' && (
            <button onClick={handleShowToken}>Show Token</button>
          )}
        </>
      ) : (
        <TokenComponent cnic={cnic} />
      )}
    </div>
  );
}

export default ReceptionComponent;
