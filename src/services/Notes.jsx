import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

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
  return axios.post(baseUrl, newObject)
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
  
  
  return axios
  .put(`http://localhost:3001/notes/${id}`, newObject)
  .then(response => {
    console.log("updated",response)
    return response;
  })
  .catch(error => {
    console.log('fail')
  })
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove,
}