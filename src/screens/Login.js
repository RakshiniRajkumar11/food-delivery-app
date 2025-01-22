// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Login() {

//   const [credentials, setcredentials] = useState({ email: "", password: "" });
//   let navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/loginUser", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password,
//       }),
//     });

//     const json = await response.json();
//     console.log(json);

//     if (!json.success) {
//       alert("Invalid Credentials");
//     }

//     if (json.success) {
//       localStorage.setItem("authToken", json.authToken);
//       console.log(localStorage.getItem("authToken"));
//       navigate("/");
//     }
//   };

//   const onChange = (event) => {
//     setcredentials({ ...credentials, [event.target.name]: event.target.value })

//   }

//   return (
//     <div className='m-15'>
//       <div className="container">

        
//         <form onSubmit={handleSubmit}>


//           <div className="mb-3 mt-5 text-light">
//             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//             <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
//           </div>
//           <div className="mb-3 mt-5 text-light">
//             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//             <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
//           </div>

//           <button type="submit" className="m-3 btn btn-primary">Submit</button>
//           <Link to="/CreateUser" className='m-3 btn btn-danger'>New User?</Link>
//         </form>
//       </div>
//     </div>
//   )
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid Credentials");
      return;
    }

    // Save the authToken and userId to localStorage
    localStorage.setItem("authToken", json.authToken);
    localStorage.setItem("userId", json.userId); // Save the userId returned from the backend
    console.log("AuthToken:", localStorage.getItem("authToken"));
    console.log("UserId:", localStorage.getItem("userId"));

    navigate("/"); // Redirect to home after successful login
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#dcedc5" }}
    >
      <div
        className="container p-4"
        style={{
          maxWidth: "400px",
          backgroundColor: "#6b8e23",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 className="text-center text-light mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-light"
            >
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-light"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#dcedd9", // Light green button
              color: "#000", // Black text for contrast
              border: "none",
            }}
          >
            Submit
          </button>
          <Link
            to="/CreateUser"
            className="btn w-100 mt-3"
            style={{
              backgroundColor: "#dcedd9", // Light green button
              color: "#000", // Black text for contrast
              border: "none",
            }}
          >
            Don't have an account already? Signup
          </Link>
        </form>
      </div>
    </div>
  );
}
