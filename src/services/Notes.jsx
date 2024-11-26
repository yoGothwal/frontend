import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://backend-2-dgny.onrender.com/notes'
  : 'http://localhost:5000/notes';

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
  

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response
  }
  
const remove = (id)=>{
  const config = {
    headers: { Authorization: token },
  }
  return axios
  .delete(`${baseUrl}/${id}`, config)
  .then(response=>{
    return response;
  })
  .catch(error => {
    console.log('fail')
  })
}
const update = (id, newObject) => {
  console.log(`Sending PUT request to update note with id: ${id}`);
  return axios
      .put(`http://localhost:5000/notes/${id}`, newObject)
      .then(response => {
          console.log("Update successful:", response);
          return response;
      })
      .catch(error => {
          console.error("Update failed:", error.message);
          throw error; // rethrow the error to handle it properly in toggleImportanceOfNote
      });
};


export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove,
  setToken: setToken
}
