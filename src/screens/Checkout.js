import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    paymentMethod: '',
    upiId: 'your-upi-id@bank', // Replace with your UPI ID
  });

  const [location, setLocation] = useState({ lat: 13.0827, lng: 80.2707 }); // Default to Chennai, India
  const [address, setAddress] = useState('Fetching address...');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { ...formData, address, location } });
  };

  function LocationSelector() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        fetchAddress(lat, lng);
      },
    });
    return null;
  }

  const fetchAddress = async (lat, lng) => {
    try {
      setLoadingAddress(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch address: ${response.status}`);
      }
      const data = await response.json();
      const formattedAddress = data.display_name || 'Address not found';
      setAddress(formattedAddress);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Unable to fetch address');
    } finally {
      setLoadingAddress(false);
    }
  };

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude);
        setLoadingLocation(false);
      },
      (error) => {
        console.error('Error fetching current location:', error);
        alert('Failed to fetch current location. Please enable location services.');
        setLoadingLocation(false);
      }
    );
  };

  React.useEffect(() => {
    fetchAddress(location.lat, location.lng);
  }, [location]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div
        className="container p-4"
        style={{
          maxWidth: '500px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#333' }}>
          Checkout
        </h2>

        {/* Fetch Location Button */}
        <button
          onClick={fetchCurrentLocation}
          disabled={loadingLocation}
          className="btn btn-primary w-100 mb-3"
        >
          {loadingLocation ? 'Fetching Location...' : 'Use Current Location'}
        </button>

        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          style={{
            height: '300px',
            borderRadius: '10px',
            marginBottom: '20px',
            overflow: 'hidden',
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>{address}</Popup>
          </Marker>
          <LocationSelector />
        </MapContainer>

        {loadingAddress ? (
          <p className="text-center" style={{ color: '#555' }}>Fetching address...</p>
        ) : (
          <p className="text-center" style={{ color: '#555' }}>
            <strong>Address:</strong> {address}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" style={{ color: '#555' }}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="paymentMethod" style={{ color: '#555' }}>
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select a payment method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            style={{ backgroundColor: '#6b8e23', color: '#fff' }}
          >
            Confirm and Pay
          </button>
        </form>
      </div>
    </div>
  );
}
