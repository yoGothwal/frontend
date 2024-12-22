import { useState } from "react";
import PropTypes from "prop-types";
import { useField } from "./CustonHooks.jsx";
const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  const onSubmit = (event) => {
    console.log(username.value);
    event.preventDefault();
    handleLogin({ username: username.value, password: password.value });
    username.reset();
    password.reset();
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            data-testid="username"
            id="username"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            data-testid="password"
            id="password"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default LoginForm;
