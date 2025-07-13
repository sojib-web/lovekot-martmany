import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Log the request config before sending
    console.log("Axios Request Config:", config);

    // Add Firebase token if available
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Attached Firebase ID token:", token);
      }
    }

    return config;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// Optional: Log response for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", response);
    return response;
  },
  (error) => {
    console.error("Axios Response Error:", error);
    return Promise.reject(error);
  }
);

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
