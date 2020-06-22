import axios from 'axios';

// axios.interceptors.response.use(null, error => {
//   console.log(error);
// });

export default axios.create({
  baseURL: 'http://104.198.38.241:9001',
});