import axios from "axios";
const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://backend-2-dgny.onrender.com/users"
    : "http://localhost:5000/users";

const adduser = async (user) => {
  const res = await axios.post(baseUrl, user);
  console.log(res);
  return res.data;
};
export default { adduser };
