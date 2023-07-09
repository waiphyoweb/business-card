import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosClient2 = axios.create({
    baseURL: `http://10.103.0.228:3500`
});

axiosClient2.interceptors.request.use((config) => {


    const cookies = new Cookies();
    const cookieValue = cookies.get('jwt');

        
    // config.headers.Authorization = `Bearer ${token}`
    config.headers['Authorization'] = cookieValue;

    return config;
})

// axiosClient2.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     const { response } = error;
//     if (response.status == 401) {
//         localStorage.removeItem('ACCESS_TOKEN')
//     }

//     throw error;
// })


export default axiosClient2;
