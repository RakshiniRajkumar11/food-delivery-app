import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Cart({ onClose }) {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate = useNavigate(); // Define navigate using useNavigate hook

  if (data.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          Your Cart is Empty!
        </div>
      </div>
    );
  }

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  const handleQuantityChange = (id, size, delta) => {
    const item = data.find((food) => food.id === id && food.size === size);
    if (item) {
      const newQty = Math.max(1, item.qty + delta); // Ensure quantity doesn't drop below 1
      dispatch({
        type: "UPDATE",
        id: id,
        qty: newQty,
        size: size,
        price: (item.price / item.qty) * newQty,
      });
    }
  };

  const handleProceedToCheckout = () => {
    onClose(); // Close the cart
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="container mt-5 cart-container">
      <h3 className="text-center mb-4">Your Cart</h3>
      <div className="cart-items">
        {data.map((food, index) => (
          <div
            key={index}
            className="card mb-3"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              marginBottom: "20px", // Add more space between items
            }}
          >
            <img
              src={food.img}
              alt={food.name}
              style={{
                width: "100px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            />
            <div className="card-body" style={{ flex: "2" }}>
              <h5 className="card-title">{food.name}</h5>
              <p
                className="card-text"
                style={{ fontSize: "0.9rem", color: "#555" }}
              >
                Option: {food.size}
              </p>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <button
                  className="btn btn-outline-secondary"
                  style={{ padding: "5px" }}
                  onClick={() => handleQuantityChange(food.id, food.size, -1)}
                  disabled={food.qty === 1}
                >
                  -
                </button>
                <span
                  style={{ fontSize: "1.2rem", fontWeight: "500" }}
                >
                  {food.qty}
                </span>
                <button
                  className="btn btn-outline-secondary"
                  style={{ padding: "5px" }}
                  onClick={() => handleQuantityChange(food.id, food.size, 1)}
                >
                  +
                </button>
                <h6
                  className="ms-4"
                  style={{
                    flexGrow: "1",
                    textAlign: "right",
                    marginTop: "10px",
                  }}
                >
                  Rs.{food.price}/-
                </h6>
                <button
                  className="btn btn-danger d-flex align-items-center justify-content-center"
                  style={{ padding: "5px", marginLeft: "10px" }}
                  onClick={() => handleRemove(index)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/trash.svg`}
                    alt="Remove"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h4 className="text-end mt-4">
        Total Price: Rs.
        {data.reduce((total, food) => total + food.price, 0)}/-
      </h4>
      <div className="text-end mt-4">
        <button className="btn btn-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
