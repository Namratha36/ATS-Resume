import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
});

export async function registerUser({username, email, password}) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}


export async function login({email, password}) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function logOut() {
  try {
    const response = await api.post("/api/auth/logout", {});
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me", {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
}