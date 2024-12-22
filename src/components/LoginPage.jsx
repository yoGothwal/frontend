import { Link } from "react-router-dom";
import Togglable from "./Togglable.jsx";
import LoginForm from "./loginForm.jsx";
import { useRef } from "react";

const LoginPage = ({ handleLogin }) => {
  const loginRef = useRef();
  return (
    <div>
      <LoginForm handleLogin={(user) => handleLogin(user)} />
      {/* <Togglable buttonLabel="Log In" ref={loginRef}>
        <LoginForm handleLogin={(user) => handleLogin(user)} />
      </Togglable> */}
    </div>
  );
};
export default LoginPage;
