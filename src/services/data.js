import axios from "axios";

// Create axios instance with a baseURL
export const api = axios.create({ baseURL: "http://localhost:8080" });

// Add an interceptor to set the authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your actual key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to send a GET request
export const sendGetRequest = (endpoint) => {
  return api.get(endpoint);
};

// Function to send a POST request
export const sendPostRequest = (endpoint, data) => {
  return api.post(endpoint, data);
};

export const sendDeleteRequest = (endpoint) => {
    return api.delete(endpoint);
};


export function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }