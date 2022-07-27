import axios from "axios";

// /api = http://localhost:8080 입니다.
export const createUserApi = async (user) => 
  await axios.post("/users/", user);

export const loginUserApi = async (user) => 
  await axios.post("/auth/login", user);