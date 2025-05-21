import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",  // endereço da sua API local
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
