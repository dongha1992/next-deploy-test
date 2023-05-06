import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";

const getBooksApi = (query?: string): Promise<any[]> => {
  return apiClient.get(`api/books?search=${query}`).then(({ data }) => data);
};

const postBookApi = (data: any): Promise<any> => {
  return apiClient.post(`api/books`, { data });
};

export { getBooksApi, postBookApi };
