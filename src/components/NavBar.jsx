import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Home = () => (
  <div>
    {" "}
    <h2>TKTL notes app</h2>{" "}
  </div>
);

const Notes = () => (
  <div>
    {" "}
    <h2>Notes</h2>{" "}
  </div>
);

const Users = () => (
  <div>
    {" "}
    <h2>Users</h2>{" "}
  </div>
);

const padding = {
  padding: 5,
};
const NavBar = () => {
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/notes" element={<Notes />}></Route>
        <Route path="/users" element={<Users />}></Route>
      </Routes>
    </Router>
  );
};
export default NavBar;
