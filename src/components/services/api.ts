import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const Api = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});
