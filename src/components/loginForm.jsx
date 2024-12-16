import { useState } from "react";
import PropTypes from "prop-types";
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
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
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            data-testid="password"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
