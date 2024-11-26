import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://backend-2-dgny.onrender.com/blogs'
  : 'http://localhost:5000/blogs'

  let token = null

  const setToken = newToken => {
    token = `Bearer ${newToken}`
    console.log("Token set to:", token);
  }
const getAll = async () => {
  if (!token) {
    console.error("Token is missing! Set the token before making requests.");
    return;
  }
  console.log("getall re")
    const config = {
      headers: { Authorization: token },
    }
    console.log(config.headers);
    const response = await axios.get(baseUrl, config)
    return response
  };
  const remove = (id) => {
    const config = {
      headers: { Authorization: token },
    }
    return axios
      .delete(`${baseUrl}/${id}`, config)
      .then(response => {
        return response
      })
      .catch(error => {
        console.error('Failed to fetch notes:', error.message);
        throw error.message; // Rethrow the error for further handling if needed
      });
  };
  const create = async newObject=>{
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response
  }

  export default { 
    getAll: getAll,
    remove: remove,
    create: create,
    setToken: setToken
  }