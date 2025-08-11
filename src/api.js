import axios from "axios";



export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";



const axiosInstance=axios.create({
    baseURL:BASE_URL,
    params:{
        api_key:API_KEY,
        language:"en-US"
    }
})

export default axiosInstance