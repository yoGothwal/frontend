import NotePage from "./components/NotePage.jsx";
import BlogPage from "./components/BlogPage.jsx";
import Footer from "./components/Footer.jsx";
import noteService from "./services/Notes.jsx";
import loginService from "./services/login.jsx";
import blogService from "./services/Blogs.jsx";
import NoteContent from "./components/NoteContent.jsx";
import { useState, useEffect, createContext } from "react";
import {
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import LoginPage from "./components/LoginPage.jsx";
import BlogContent from "./components/BlogContent.jsx";
import SignUp from "./components/SignUp.jsx";
import ChatComponent from "./components/ChatComponent.jsx";

const api_key = import.meta.env.VITE_SOME_KEY;

export const UserContext = createContext();
const App = () => {
  const [user, setUser] = useState();
  const [notes, setNotes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
      blogService.setToken(user.token);

      console.log("Current User:", user);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      noteService
        .getAll()
        .then((response) => {
          const filteredNotes = response.data.filter(
            (note) => note.user && note.user.username === user.username
          );
          console.log("Notes:", filteredNotes);
          setNotes(filteredNotes);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      blogService
        .getAll()
        .then((response) => {
          const blogs = response.data;
          console.log("blogs:", blogs);

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
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await loginService.login({ username, password });
      const user = response.data;
      console.log("Loggin in:", user);
      console.log("Token set to:", token);

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      noteService.setToken(user.token);
      blogService.setToken(user.token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    navigate("/login");
  };
  const logoutButton = () => (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );

  const Notification = ({ msg }) => {
    if (msg == null) return null;
    return <div className="error">{msg}</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user: user }}>
      <div>
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
                  <Navigate replace to="/dashboard" />
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
                    <Link to="/blogs">blogs</Link>| <Link to="/chat">Chat</Link>
                  </div>
                ) : (
                  <Navigate to="/login"></Navigate>
                )
              }
            ></Route>
            <Route
              path="/chat"
              element={<ChatComponent></ChatComponent>}
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
    </UserContext.Provider>
  );
};
export default App;
