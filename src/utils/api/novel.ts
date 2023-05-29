import { apiClient } from "./apiClient";
import { CreateNovelData } from "./type";

const getNovelsApi = (query?: string): Promise<any[]> => {
  return apiClient.get(`api/novels?search=${query}`).then(({ data }) => data);
};

const postNovelApi = (data: CreateNovelData): Promise<any> => {
  return apiClient.post(`api/novels`, { data });
};

const getNovelDetailApi = (id: number): Promise<any> => {
  return apiClient.get(`api/novels/${id}`).then(({ data }) => data);
};

const deleteNovelApi = (id: number): Promise<any> => {
  return apiClient.delete(`api/novels/${id}`);
};

const editNovelApi = (
  id: number,
  data: { body: string; title: string }
): Promise<any> => {
  return apiClient.patch(`api/novels/${id}`, { data });
};

const deleteNovelCommentApi = (commentId: number): Promise<any> => {
  return apiClient.delete(`api/novels/${commentId}/comment`);
};

const postNovelCommentApi = ({
  id,
  data,
}: {
  id: number;
  data: string;
}): Promise<any> => {
  return apiClient.post(`api/novels/${id}/comment`, { data });
};

const deleteNovelLikeApi = (id: number): Promise<any> => {
  return apiClient.delete(`api/novels/${id}/like`);
};

const postNovelLikeApi = (id: number): Promise<any> => {
  return apiClient.post(`api/novels/${id}/like`);
};

export {
  getNovelsApi,
  postNovelApi,
  getNovelDetailApi,
  deleteNovelApi,
  editNovelApi,
  deleteNovelCommentApi,
  postNovelCommentApi,
  deleteNovelLikeApi,
  postNovelLikeApi,
};
