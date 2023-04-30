import Axios, { AxiosError } from "axios";
import { deleteCookie } from "cookies-next";

const apiClient = Axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

export { apiClient };
