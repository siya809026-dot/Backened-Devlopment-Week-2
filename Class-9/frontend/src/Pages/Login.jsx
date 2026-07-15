import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );

      console.log(response.data.token)

      localStorage.setItem(
        "token",
        response.data.token
      );



       navigate("/dashboard");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <h2>Login Page</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br /><br />

        <button>Login</button>

      </form>

      <p>
        New User?
        <Link to="/signup"> Signup</Link>
      </p>

    </div>
  );
};

export default Login;