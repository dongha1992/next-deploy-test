import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";
import { CreateBookData } from "@/query/book";

const getBooksApi = (query?: string): Promise<any[]> => {
  return apiClient.get(`api/books?search=${query}`).then(({ data }) => data);
};

const postBookApi = (data: CreateBookData): Promise<any> => {
  return apiClient.post(`api/books`, { data });
};

const getBookDetailApi = (id: number): Promise<any> => {
  return apiClient.get(`api/books/${id}`).then(({ data }) => data);
};
export { getBooksApi, postBookApi, getBookDetailApi };
