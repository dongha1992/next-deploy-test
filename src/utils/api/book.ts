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

const deleteBookApi = (id: number): Promise<any> => {
  return apiClient.delete(`api/books/${id}`);
};

const editBookApi = (id: number, data: { body: string }): Promise<any> => {
  return apiClient.patch(`api/books/${id}`, { data });
};

const deleteBookCommentApi = (id: number): Promise<any> => {
  return apiClient.delete(`api/books/${id}/comment`);
};

const postBookCommentApi = ({
  id,
  data,
}: {
  id: number;
  data: string;
}): Promise<any> => {
  return apiClient.post(`api/books/${id}/comment`, { data });
};

const deleteLikeApi = (id: number): Promise<any> => {
  return apiClient.delete(`api/books/${id}/like`);
};

const postLikeApi = (id: number): Promise<any> => {
  return apiClient.post(`api/books/${id}/like`);
};

export {
  getBooksApi,
  postBookApi,
  getBookDetailApi,
  deleteBookApi,
  editBookApi,
  deleteBookCommentApi,
  postBookCommentApi,
  deleteLikeApi,
  postLikeApi,
};
