import axios from "axios";

const newRequest = axios.create({
  baseURL: import.meta.env.VITE_UPLOAD_URL_PREFIX,
  withCredentials: true,
});

export default newRequest;