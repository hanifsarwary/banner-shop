import axios from 'axios';
const token = localStorage.getItem('token');

// axios.interceptors.response.use(null, error => {
//   console.log(error);
// });

export default axios.create({
  baseURL: 'http://104.198.38.241:9001',
  headers: {
    Authorization: `Token ${token}`
  }
});