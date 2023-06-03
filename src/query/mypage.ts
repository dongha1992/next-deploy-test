import { useSyncMutation } from "@/hooks/query";
import { popupState } from "@/store/common";
import { getMyReviewsApi, patchNameApi } from "@/utils/api/mypage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

export const MYPAGE_REVIEWS_QUERY_KEY = "getReviews";

interface QueryProps {
  options?: any;
  email: string;
}

const useGetMyReviewList = ({ email, options }: QueryProps) => {
  return useQuery(getGetMyReviewConfig(email, options));
};

function usePathcUserName() {
  const { status, data, update } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);

  return useSyncMutation((name: string) => patchNameApi({ name }), {
    onSuccess: (name: string) => {
      update({ name });
      setPopup({
        isOpen: false,
      });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
}

const getGetMyReviewConfig = (email: string, options = {}) => ({
  queryKey: [MYPAGE_REVIEWS_QUERY_KEY, email],
  queryFn: () => getMyReviewsApi({ email }),
  config: {
    ...options,
  },
});

export { useGetMyReviewList, usePathcUserName };
