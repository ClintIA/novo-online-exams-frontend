import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'https://api.clintia.com.br',
});

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
      const token = Cookies.get('token');
      // const tenantId = '1'; 
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      // if (tenantId) {
      //   config.headers['x-tenant-id'] = tenantId;
      // }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default api;

// api.interceptors.request.use(
//   (config) => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInRlbmFudElkIjoxLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzAzNDAwMTIsImV4cCI6MTczMDM0MzYxMn0.knyyGMbFymTg9SVlwsaX793Id0XDtTdGJmG0Gf4Vtws'; // use a variável ou função que retorna o token
//     const tenantId = '1'; // use a variável ou função que retorna o tenantId

//     // Verifica se a URL é diferente de /auth/login/patient antes de adicionar os cabeçalhos
//     if (config.url !== '/auth/login/patient') {
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       if (tenantId) {
//         config.headers['x-tenant-id'] = tenantId;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

