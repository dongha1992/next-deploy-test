import { apiClient } from "./apiClient";

const getMyReviewsApi = (params: { email: string }): Promise<any[]> => {
  return apiClient.get(`api/mypage/list`, { params }).then(({ data }) => data);
};

const patchUserProfileApi = (data: { name: string; profileImage: string }) => {
  return apiClient.patch(`/api/auth`, { data }).then(({ data }) => data);
};

export { getMyReviewsApi, patchUserProfileApi };
