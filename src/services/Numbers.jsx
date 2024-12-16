import axios from "axios";
const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://backend-2-dgny.onrender.com/persons"
    : "http://localhost:5000/persons";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data) // Return only the data part
    .catch((error) => {
      throw new Error("Failed to fetch data: " + error.message); // Clearer error handling
    });
};

const create = (newObject) => {
  return axios
    .post(`${baseUrl}`, newObject)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error.response.data.error);
      throw error;
    });
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => {
      console.log("updated", response.data);
      return response;
    })
    .catch((error) => {
      console.log("fail");
    });
};
const remove = (id) => {
  console.log("remove", id);
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => {
      console.log("deleted person");
      return response;
    })
    .catch((error) => {
      console.log("fail");
    });
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
};
