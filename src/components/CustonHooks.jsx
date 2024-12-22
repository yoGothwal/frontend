import { useEffect, useState } from "react";
import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log("Token set to:", token);
};
const useResource = ({ baseUrl }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const fetch = async () => {
    if (!token) return;
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    setData(response.data);
  };
  useEffect(() => {
    fetch();
  }, [token]);
  const getAll = async () => {
    if (!token) {
      console.error("Token is missing! Set the token before making requests.");
      return;
    }
    console.log("getall re");
    const config = {
      headers: { Authorization: token },
    };
    console.log(config.headers);
    const response = await axios.get(baseUrl, config);
    return response;
  };
  const remove = async (id) => {
    if (!token) {
      console.error("Token is missing! Set the token before making requests.");
      return;
    }
    const config = {
      headers: { Authorization: token },
    };
    return axios
      .delete(`${baseUrl}/${id}`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Failed to fetch notes:", error.message);
        throw error.message; // Rethrow the error for further handling if needed
      });
  };
  const create = async (newObject) => {
    if (!token) {
      console.error("Token is missing! Set the token before making requests.");
      return;
    }
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response;
  };
  const update = async (id, newObject) => {
    if (!token) {
      console.error("Token is missing! Set the token before making requests.");
      return;
    }
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response;
  };
  return [data, { getAll, create, remove, update, setToken }];
};
const useCounter = () => {
  const [counter, setCounter] = useState(0);
  const inc = () => {
    setCounter(counter + 1);
  };
  const dec = () => {
    setCounter(counter - 1);
  };
  const zero = () => {
    setCounter(0);
  };
  return {
    counter,
    zero,
    inc,
    dec,
  };
};
const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    reset,
  };
};
export { useCounter, useField, useResource };
