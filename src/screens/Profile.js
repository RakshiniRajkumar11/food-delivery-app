import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error] = useState(null); // To handle errors


  const fetchProfile = async () => {
    const token = localStorage.getItem('authToken'); // Fetch token
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Profile data:', data);
      setProfile(data.profile);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };
  

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="container mt-5">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

    return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#2e3b4e" }}
    >
      <div
        className="card text-white p-4"
        style={{
          maxWidth: "500px",
          backgroundColor: "#1a202c",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="card-body text-center">
          <h3 className="mb-4" style={{ color: "#63b3ed" }}>
            User Profile
          </h3>
          <div className="text-start">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
            <p>
              <strong>Date Created:</strong>{" "}
              {new Date(profile.date).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}