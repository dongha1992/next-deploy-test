import { apiClient } from "./apiClient";

const getMyReviewsApi = (params: any): Promise<any[]> => {
  return apiClient
    .get(`api/mypage/reviews`, { params })
    .then(({ data }) => data);
};

export { getMyReviewsApi };
