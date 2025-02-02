import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_LARAVEL_API_URL || "https://monassabatmaroc.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
