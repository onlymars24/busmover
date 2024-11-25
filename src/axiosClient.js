import axios from 'axios'
// import store from './store'
import router from './router'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

// axiosAdmin.interceptors.request.use(config => {
//     config.headers.Authorization = 'Bearer '+ localStorage.getItem('authAdminToken')
//     return config;
// })

// axiosClient.defaults.withCredentials = true;
// axiosClient.defaults.withXSRFToken = true;


// axiosAdmin.interceptors.response.use(response => {
//     return response;
//   }, error => {
//     if (error.response.status === 401) {
//       store.commit('unsetMember')
//       router.push({name: 'ALogin'})
//     }
//     if(error.response.status === 403) {
//       router.push({name: 'KladrStationPage'})
//     }
//     throw error;
//   })


export default axiosClient;