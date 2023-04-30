import Axios, { AxiosError } from "axios";

const apiClient = Axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

export { apiClient };
