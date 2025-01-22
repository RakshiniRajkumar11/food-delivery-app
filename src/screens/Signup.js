// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// export default function Signup() {

//     const [credentials, setcredentials ] = useState({name:"", email:"", password:"", geolocation:""})

//     const handleSubmit = async(e)=>{
//             e.preventDefault();
//             const response = await fetch('http://localhost:5000/api/CreateUser',{
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation})

//             });

//             const json = await response.json()
//             console.log(json);
//             if(!json.success){
//                 alert("Invalid Credentials");
//             }

//     }

//     const onChange=(event)=>{
//         setcredentials({...credentials,[event.target.name]: event.target.value})
        
//     }

//   return (
//     <div>
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#dcedc5" }}>
//         <form onSubmit={handleSubmit}> 
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label ">Name</label>
//             <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
//           </div>
      
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//             <input type="email" className="form-control" name='email' value={credentials.email}  onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//             <input type="password" className="form-control" name='password' value={credentials.password}  onChange={onChange}  id="exampleInputPassword1"/>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="exampleInputLocation1" className="form-label">Address</label>
//             <input type="text" className="form-control" name='geolocation' value={credentials.geolocation}   onChange={onChange} id="exampleInputLocation1"/>
//           </div>
        
//           <button type="submit" className="m-3 btn btn-primary">Submit</button>
//           <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
//         </form>
//       </div>
//     </div> 
  
//   )
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Invalid Credentials");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#dcedc5" }} // Background color
    >
      <div
        className="container p-4"
        style={{
          maxWidth: "400px",
          backgroundColor: "#6b8e23", // Card background
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 className="text-center text-light mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-light">
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
            <label htmlFor="exampleInputPassword1" className="form-label text-light">
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
          <div className="mb-3">
            <label htmlFor="exampleInputLocation1" className="form-label text-light">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              id="exampleInputLocation1"
              placeholder="Enter your address"
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
            Signup
          </button>
          <Link
            to="/login"
            className="btn w-100 mt-3"
            style={{
              backgroundColor: "#dcedd9", // Light green button
              color: "#000", // Black text for contrast
              border: "none",
            }}
          >
            Already a user? Login
          </Link>
        </form>
      </div>
    </div>
  );
}
