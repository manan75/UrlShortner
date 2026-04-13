import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const shortenUrl = (data) => API.post("/shorten", data);
export const getStats = (code) => API.get(`/stats/${code}`);