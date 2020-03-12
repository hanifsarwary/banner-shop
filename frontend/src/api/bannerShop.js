import axios from 'axios';
// const cors = 'https://cors-anywhere.herokuapp.com/'
const token = localStorage.getItem('token');

// axios.interceptors.response.use(null, error => {
//   console.log(error);
// });

export default axios.create({
  baseURL: 'http://34.68.49.20:8001',
  headers: {
    Authorization: `Token ${token}`
  }
});