import axios from 'axios';
import Cookies from 'universal-cookie';
import axiosClient2 from './axios-in-axios'
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
    baseURL: `http://10.103.0.228:3500`
});

axiosClient.interceptors.request.use((config) => {

    const cookies = new Cookies();
    const cookieValue = cookies.get('token');
    const refreshToken = cookies.get('jwt');
        if(cookieValue){
        const jwt = jwt_decode(cookieValue);
        const exp = jwt.exp * 1000;
        const currentTime = new Date().getTime();
        

        if (currentTime > exp) {
            // deleteCookie("token");
            axiosClient2
            .post("/refresh", {refreshToken} )
            .then(({ data }) => {
              console.log(data.accessToken);
              cookies.set("token", data.accessToken, {path: '/'});
              cookies.set("jwt", data.refreshToken, {path: '/'});
              console.log(data.refreshToken);
            })
            .catch((err) => {
              console.log(err);
            });
        }
       
    }
    config.headers.Authorization = `Bearer ${cookieValue}`


    return config;
})

// axiosClient.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     const { response } = error;
//     if (response.status == 401) {
//         // localStorage.removeItem('ACCESS_TOKEN')
//         const cookies = new Cookies();
//         cookies.remove("token")
//         // cookies.remove("jwt")
        
        
//     }
    
//     throw error;
// })


export default axiosClient;
