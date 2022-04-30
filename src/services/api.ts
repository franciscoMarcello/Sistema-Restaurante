import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.140:5000",
});

export { api };
