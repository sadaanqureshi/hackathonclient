import React, { useState } from 'react';
import axios from 'axios';

function StaffComponent() {
  const [tokenNumber, setTokenNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [beneficiary, setBeneficiary] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBeneficiary(null);

    try {
      const res = await axios.post('http://localhost:5000/getinfo/token', { tokenNumber });
      setBeneficiary(res.data);
      setStatus(res.data.status || 'In Progress'); // Default status
    } catch (err) {
      setError('Error retrieving beneficiary details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!beneficiary) return;

    try {
      await axios.post('http://localhost:5000/getinfo/update-status', {
        token: beneficiary.token,
        status,
      });
      alert('Status updated successfully!');
    } catch (err) {
      alert('Error updating status.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Scan Token</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tokenNumber" className="block text-gray-600 font-medium">Token Number:</label>
            <input
              type="text"
              id="tokenNumber"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tokenNumber}
              onChange={(e) => setTokenNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        {beneficiary && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Beneficiary Details</h3>
            <div className="mt-2 text-gray-600">
              <p><strong>CNIC:</strong> {beneficiary.cnic}</p>
              <p><strong>Name:</strong> {beneficiary.name}</p>
              <p><strong>Phone:</strong> {beneficiary.phone}</p>
              <p><strong>Purpose:</strong> {beneficiary.purpose}</p>
              <p><strong>Current Status:</strong> {beneficiary.status}</p>
            </div>

            <div className="mt-4">
              <label htmlFor="status" className="block text-gray-600 font-medium">Update Status:</label>
              <select
                id="status"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={handleStatusChange}
                className="w-full mt-3 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
              >
                Update Status
              </button>
            </div>
          </div>
        )}

        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default StaffComponent;
