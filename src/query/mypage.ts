import { getMyReviewsApi } from "@/utils/api/mypage";
import { useQuery } from "@tanstack/react-query";

export const MYPAGE_REVIEWS_QUERY_KEY = "getReviews";

interface QueryProps {
  options?: any;
  email: string;
}

const useGetMyReviewList = ({ email, options }: QueryProps) => {
  return useQuery(getGetMyReviewConfig(email, options));
};

const getGetMyReviewConfig = (email: string, options = {}) => ({
  queryKey: [MYPAGE_REVIEWS_QUERY_KEY, email],
  queryFn: () => getMyReviewsApi({ email }),
  config: {
    ...options,
  },
});

export { useGetMyReviewList };
