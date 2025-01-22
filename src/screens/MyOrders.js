import React, { useState, useEffect } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch(`http://localhost:5000/api/myOrders?userId=${userId}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          alert("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order._id} className="list-group-item">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong> {new Date(order.date).toLocaleString()}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.qty} x ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
