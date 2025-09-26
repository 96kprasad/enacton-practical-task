import axios from "axios";
import { APIURL } from "../src/services/ApiEndPoints";

// Axios instance create karo
export const axiosInstance = axios.create({
  baseURL: APIURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
