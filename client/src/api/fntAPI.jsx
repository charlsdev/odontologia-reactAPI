import axios from "axios";

export const registerUser = async (data) => {
   return await axios.post(`${import.meta.env.VITE_API}/register`, data);
};

export const loginUser = async (data) => {
   return await axios.post(`${import.meta.env.VITE_API}/`, data, {
      withCredentials: true,
   });
};
