import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://backend-2-dgny.onrender.com/login'
  : 'http://localhost:5000/login';

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log("login response :",response.data)
  return response
}

export default { login }