import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://backend-2-dgny.onrender.com/notes' // Replace with your production URL

  : 'http://localhost:5000/notes'; // For development mode

const getAll = () => {
    return axios
      .get(baseUrl)
      .then(response => {
        //console.log('response 1 ',response); // Log the data for debugging
        return response
      })
      .catch(error => {
        console.error('Failed to fetch notes:', error.message);
        throw error.message; // Rethrow the error for further handling if needed
      });
  };
  

const create = newObject => {
  return axios.post(`${baseUrl}`, newObject)
  .then(res=>{
    return res
  })
  .catch((error =>{
    console.log("Error:", error)
  }))
}
const remove = (id)=>{
  return axios
  .delete(`${baseUrl}/${id}`)
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
}
