import axios from 'axios';

// axios.interceptors.response.use(null, error => {
//   console.log(error);
// });

export default axios.create({
  baseURL: 'http://34.68.49.20:8001',
});