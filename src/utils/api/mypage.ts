import { apiClient } from "./apiClient";

const getMyReviewsApi = (params: { email: string }): Promise<any[]> => {
  return apiClient.get(`api/mypage/list`, { params }).then(({ data }) => data);
};

export { getMyReviewsApi };
