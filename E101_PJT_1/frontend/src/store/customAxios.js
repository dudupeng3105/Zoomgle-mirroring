import axios from "axios";

export const customAxios = axios.create({
  baseURL: 'https://i7e101.p.ssafy.io/',
  // baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',    
  },
});

export const customJWTAxios = axios.create({
  baseURL: 'https://i7e101.p.ssafy.io/',
  // baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});