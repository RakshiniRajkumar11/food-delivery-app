import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useCart(); // Fetch cart items from context
  const dispatch = useDispatchCart(); // Dispatch actions to the cart

  // Extract payment data from location.state
  const { name, paymentMethod } = location.state || {};

  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    otp: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!name || !paymentMethod) {
      alert("Invalid payment details. Redirecting to checkout...");
      navigate("/checkout");
    }
  }, [name, paymentMethod, navigate]);

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleGenerateOtp = () => {
    alert("OTP sent to your registered mobile number!");
    setShowOtp(true);
  };

  const calculateTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) return 0; // Guard against null or empty cart
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handlePayNow = async () => {
    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
      if (!cardDetails.otp || cardDetails.otp !== "1234") {
        alert("Invalid OTP. Please try again.");
        return;
      }
    }

    // Simulate payment success
    await simulatePaymentSuccess();
  };

  const simulatePaymentSuccess = async () => {
    setPaymentSuccess(true);

    // Clear the cart
    dispatch({ type: "CLEAR_CART" });

    // Redirect to Home Page after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="container text-center p-4"
        style={{
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="mb-4" style={{ color: "#333" }}>
          Payment
        </h2>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>

        {paymentMethod === "UPI" && (
          <div className="mt-4">
            <h5>Enter UPI ID</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            {upiId && (
              <div className="mt-3">
                <QRCodeCanvas
                  value={`upi://pay?pa=${upiId}&pn=${name}&am=${calculateTotalAmount()}&cu=INR`}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
                <p>Scan this QR code to pay</p>
              </div>
            )}
          </div>
        )}

        {(paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (
          <div className="mt-4">
            <h5>Enter Card Details</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9101 1121"
                  maxLength="16"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div style={{ width: "48%" }}>
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    maxLength="3"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                  />
                </div>
              </div>
              {showOtp && (
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP"
                    maxLength="4"
                    value={cardDetails.otp}
                    onChange={handleCardDetailsChange}
                  />
                </div>
              )}
              {!showOtp && (
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleGenerateOtp}
                >
                  Generate OTP
                </button>
              )}
            </form>
          </div>
        )}

        <button
          type="button"
          className="btn btn-success w-100 mt-4"
          onClick={handlePayNow}
        >
          Pay Now
        </button>

        {paymentSuccess && (
          <div className="mt-4">
            <h5 style={{ color: "green" }}>
              Payment Successful! Redirecting to Home...
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
