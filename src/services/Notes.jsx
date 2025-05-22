import axios from "axios";
const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://backend-2-dgny.onrender.com/notes"
    : "http://localhost:5000/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  if (!token) {
    console.error("Token is missing! Set the token before making requests.");
    return;
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios
    .delete(`${baseUrl}/${id}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Update failed:", error.message);
    });
};
const update = async (id, newObject) => {
  console.log(`Sending PUT request to update note with id: ${id}`);
  const config = {
    headers: { Authorization: token },
  };
  return axios
    .put(`${baseUrl}/${id}`, newObject, config)
    .then((response) => {
      console.log("Update successful:", response);
      return response;
    })
    .catch((error) => {
      console.error("Update failed:", error.message);
      throw error; // rethrow the error to handle it properly in toggleImportanceOfNote
    });
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
  setToken: setToken,
};
