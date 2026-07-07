import React, { useEffect, useState } from "react";
import axios from "axios";
import { createuser, getuser } from "../api";

const EmployeeCard = () => {
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    empId: "",
  });

  // Get Users
  async function getUserData() {
    try {
      const response = await axios.get(getuser);
      console.log(response.data);
      setUsers(response.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  // Input Change
  function changeHandler(e) {
    const { name, value } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Create User
  async function createUser() {
    try {
      const response = await axios.post(createuser, newUser);
      console.log(response.data);

      getUserData();

      setNewUser({
        name: "",
        email: "",
        empId: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Form Submit
  function submitHandler(e) {
    e.preventDefault();
    createUser();
  }

  return (
    <div>
      <h1>Employee System App</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={changeHandler}
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={changeHandler}
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Employee ID"
          name="empId"
          value={newUser.empId}
          onChange={changeHandler}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>Employee List</h2>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
            color:"red",
          }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.empId}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;