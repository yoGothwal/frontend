import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data) // Return only the data part
    .catch(error => {
      throw new Error("Failed to fetch data: " + error.message); // Clearer error handling
    });
};


  const create = (newObject) => {
    return axios
      .post('http://localhost:3001/api/persons', newObject)
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log("Failed to add person:", error);
        throw error;
      });
  };

const update = (id, newObject) => {
  return axios
  .put(`${baseUrl}/${id}`, newObject)
  .then(response => {
    console.log("updated",response.data)
    return response;
  })
  .catch(error => {
    console.log('fail')
  })
}
const remove = (id) => {
  return axios
  .delete(`${baseUrl}/${id}`)
  .then(response => {
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
  remove: remove
}