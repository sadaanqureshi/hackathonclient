import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TokenComponent({ cnic }) {
  const [tokenId, setTokenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!cnic) return;

    const fetchToken = async () => {
      try {
        console.log(cnic)
        const response = await axios.get(`http://localhost:5000/gettoken/gettoken/${cnic}`);
        setTokenId(response.data.tokenId);
      } catch (err) {
        setError('Failed to fetch token.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [cnic]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Token ID</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : tokenId ? (
          <p style={styles.tokenText}>{tokenId}</p>
        ) : (
          <p>No token found for CNIC: {cnic}</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',  // Full viewport height
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    width: '300px',  // Fixed width
    height: '300px', // Fixed height to make it square
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  tokenText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default TokenComponent;
