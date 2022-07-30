import axios from "axios";

export const customAxios = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});