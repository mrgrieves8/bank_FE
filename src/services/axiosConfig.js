// src/services/axiosConfig.js
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080" // or your local dev server
});

export default instance;
