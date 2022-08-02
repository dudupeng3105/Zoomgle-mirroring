import axios from "axios";

export const customAxios = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://i7e101.p.ssafy.io/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});