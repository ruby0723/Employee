import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (data) => API.post("/auth/login", data);

export const fetchEmployees = () => API.get("/employees");
export const createEmployee = (data) => API.post("/employees/create", data);
export const updateEmployee = (id, data) => API.put(`/employees/update/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/delete/${id}`);

export default API;