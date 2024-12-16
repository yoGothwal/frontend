import React, { useState } from "react";
import signupServices from "../services/Signup";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const addedUser = await signupServices.adduser(newUser);
    console.log(addedUser);
    setNewUser({
      name: "",
      username: "",
      password: "",
    });
    navigate("/login");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="newname">Name: </label>
          <input
            type="text"
            id="newname"
            name="name"
            onChange={handleChange}
            value={newUser.name}
          />
        </div>
        <div>
          <label htmlFor="newusername">Username:</label>
          <input
            type="text"
            id="newusername"
            name="username"
            value={newUser.username}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="newpassword">Password:</label>
          <input
            type="password"
            id="newpassword"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
