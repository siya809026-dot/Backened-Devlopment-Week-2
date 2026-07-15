import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student"
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
                "http://localhost:4000/signup",
                formData
            );

            console.log(response)

            navigate("/login");

        } catch (error) {

            console.log(error);

        }


    };

    return (
        <div>

            <h2>Signup Page</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                />

                <br /><br />

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

                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                </select>

                <br /><br />

                <button>Signup</button>

            </form>

            <p>
                Already have account?
                <Link to="/login"> Login</Link>
            </p>

        </div>
    );
};

export default Signup;