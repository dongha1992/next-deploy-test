import { useSyncMutation } from "@/hooks/query";
import { popupState } from "@/store/common";
import { getMyReviewsApi, patchUserProfileApi } from "@/utils/api/mypage";
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

function usePathcUserProfile() {
  const { status, data, update } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);

  return useSyncMutation(
    (data: { name: string; profileImage: string }) => patchUserProfileApi(data),
    {
      onSuccess: ({ name, image }: { name: string; image: string }) => {
        update({ name, image });
        setPopup({
          isOpen: false,
        });
      },
      onError: (error: any) => {
        console.error(error);
      },
    }
  );
}

const getGetMyReviewConfig = (email: string, options = {}) => ({
  queryKey: [MYPAGE_REVIEWS_QUERY_KEY, email],
  queryFn: () => getMyReviewsApi({ email }),
  config: {
    ...options,
  },
});

export { useGetMyReviewList, usePathcUserProfile };
