import axios from 'axios';
const token = localStorage.getItem('token');
const Instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { Authorization: `${token}` },
});

export default Instance;

// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${
//       localStorage.getItem('token')
//         ? JSON.parse(localStorage.getItem('token')).token
//         : null
//     }`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;
