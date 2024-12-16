import NotePage from "./components/NotePage";
import BlogPage from "./components/BlogPage";
import LoginForm from "./components/loginForm";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";
import noteService from "./services/Notes";
import loginService from "./services/login";
import blogService from "./services/Blogs";
import NoteContent from "./components/NoteContent";
import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginPage from "./components/LoginPage";
import BlogContent from "./components/BlogContent";
import SignUp from "./components/SignUp";

const api_key = import.meta.env.VITE_SOME_KEY;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); //for notification

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
      blogService.setToken(user.token);
    }
    setLoading(false);
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await loginService.login({ username, password });
      const user = response.data;
      console.log(user.token);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      noteService.setToken(user.token);
      blogService.setToken(user.token);
    } catch (error) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear(); // Clears all data from localStorage
    setUser(null); // Resets the user state
    navigate("/login");
  };
  const logoutButton = () => (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );

  const loginRef = useRef();
  const loginForm = () => (
    <div>
      {/* <button onClick={showLogin}>Show Login Form</button> */}
      <Togglable buttonLabel="Log In" ref={loginRef}>
        <LoginForm handleLogin={(user) => handleLogin(user)} />
      </Togglable>
    </div>
  );

  const Notification = ({ msg }) => {
    if (msg == null) return null;
    return <div className="error">{msg}</div>;
  };
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (user) {
      noteService
        .getAll()
        .then((response) => {
          const filteredNotes = response.data.filter(
            (note) => note.user && note.user.username === user.username
          );
          setNotes(filteredNotes);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [user]);

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    if (user) {
      blogService
        .getAll()
        .then((response) => {
          const blogs = response.data;

          const filteredBlogs = blogs.filter(
            (blog) => blog.user && blog.user.username === user.username
          );
          setBlogs(filteredBlogs);
        })
        .catch((error) => {
          console.error("Error fetching vlogs:", error);
        });
    }
  }, [user]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <h1 className="heading">Social Media</h1>
        {message ? <Notification msg={message}></Notification> : null}
        {user && <p>{user.username} logged-in</p>}
        {user === null && <Link to="/signup"></Link>}

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard"></Navigate>
              ) : (
                <div>
                  <Link to="/login">Log in</Link> |{" "}
                  <Link to="/signup">Sign up</Link>
                </div>
              )
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <div>
                <p>
                  Alrady have an account <Link to="/login">Log in</Link>
                </p>
                <SignUp />
              </div>
            }
          ></Route>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" />
              ) : (
                <div>
                  <p>
                    Don't have an account <Link to="/signup">Sign up</Link>
                  </p>
                  <LoginPage handleLogin={handleLogin}></LoginPage>
                </div>
              )
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              user ? (
                <div>
                  <Link to="/notes">notes</Link> |{" "}
                  <Link to="/blogs">blogs</Link>
                </div>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>

          <Route
            path="/notes"
            element={
              user ? (
                <div>
                  <Link to="/blogs">blogs</Link>
                  <NotePage notes={notes} setNotes={setNotes}></NotePage>
                </div>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/blogs"
            element={
              user ? (
                <div>
                  <Link to="/notes">notes</Link>
                  <BlogPage blogs={blogs} setBlogs={setBlogs}></BlogPage>
                </div>
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/notes/:id"
            element={
              user ? (
                <NoteContent notes={notes} />
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/blogs/:id"
            element={
              user ? (
                <BlogContent blogs={blogs} />
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          ></Route>
        </Routes>
      </div>
      <div>
        {user && logoutButton()}
        <Footer></Footer>
      </div>
    </div>
  );
};
export default App;
