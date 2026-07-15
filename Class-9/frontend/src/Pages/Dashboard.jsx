import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        console.log('dashboard token', token)

         
        if (!token) {
            navigate("/login");
            return;
        }

        getProfile();

    }, []);

    const getProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:4000/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response)

            setUser(response.data.user);

        } catch (error) {

            console.log(error);

            alert("Session Expired");

            localStorage.removeItem("token");

            navigate("/login");
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>Welcome to Dashboard page</h1>

            {
                user ? (
                    <>
                        <h2>Welcome {user.name}</h2>

                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>

                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <h3>Loading...</h3>
                )
            }

        </div>
    );
};

export default Dashboard;