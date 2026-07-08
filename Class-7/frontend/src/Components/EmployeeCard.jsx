
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeCard.css";
import { createuser, getuser, deleteuser, updateuser } from "../api";

const EmployeeCard = () => {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [userid, setUserId] = useState("");

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

      await getUserData();

      setNewUser({
        name: "",
        email: "",
        empId: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Delete User
  async function deleteHandler(userid) {
    try {
      console.log(userid);

      const response = await axios.delete(`${deleteuser}/${userid}`);

      console.log(response.data);

      await getUserData();
    } catch (error) {
      console.log(error);
    }
  }

  // Edit User
  function editHandler(user) {
    console.log(user);

    setUserId(user._id);
    setIsEdit(true);

    setNewUser({
      name: user.name,
      email: user.email,
      empId: user.empId,
    });
  }

  // Update User
  async function updatedUser() {
    try {
      const response = await axios.put(
        `${updateuser}/${userid}`,
        newUser
      );

      console.log(response.data);

      await getUserData();

      setIsEdit(false);

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

    if (isEdit) {
      updatedUser();
    } else {
      createUser();
    }
  }

  return (
    <div className="container">
      <h1>Employee System App</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={changeHandler}
        />
        

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={changeHandler}
        />
        

        <input
          type="text"
          placeholder="Employee ID"
          name="empId"
          value={newUser.empId}
          onChange={changeHandler}
        />
    

        <button type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>

      

      <h2>Employee List</h2>
  {users.map((item, i) => {
  return (
    <div className="card"
      key={i}
     style={{
  background: "#fff",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
}}
    >
      <h3>{item.name}</h3>
      <p>{item.email}</p>
      <p>{item.empId}</p>

      <button
  className="delete-btn"
  onClick={() => deleteHandler(item._id)}
>
  Delete
</button>

<button
  className="edit-btn"
  onClick={() => editHandler(item)}
>
  Edit
</button>
    </div>
  );
})}
    </div>
  );
};

export default EmployeeCard;