
import React, { useEffect, useState } from "react";
import axios from "axios";
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

        <button type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>

      <hr />

      <h2>Employee List</h2>
  {users.map((item, i) => {
  return (
    <div
      key={i}
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        color: "red",
      }}
    >
      <h3>{item.name}</h3>
      <p>{item.email}</p>
      <p>{item.empId}</p>

      <button onClick={() => deleteHandler(item._id)}>Delete</button>
      <button onClick={() => editHandler(item)}>Edit</button>
    </div>
  );
})}
    </div>
  );
};

export default EmployeeCard;