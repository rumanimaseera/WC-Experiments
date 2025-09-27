import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fname.length < 6) {
      alert("First name must be at least 6 characters long.");
      return;
    }
    if (!/^[A-Za-z]+$/.test(formData.fname)) {
      alert("First name must contain only alphabets.");
      return;
    }
    if (formData.lname === "") {
      alert("Last name cannot be empty.");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      alert("Invalid Email format.");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }
    if (formData.address === "") {
      alert("Address cannot be empty.");
      return;
    }

    alert("Registration Successful!");
  };

  return (
    <div className="container">
      <h2>React Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
