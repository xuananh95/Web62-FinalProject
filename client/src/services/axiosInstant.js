import axios from "axios";

const axiosInstant = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 6000,
});

export default axiosInstant;
