import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";

const getBooksApi = (): Promise<AxiosResponse> => {
  return apiClient.get(`api/books`);
};

export { getBooksApi };
