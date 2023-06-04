import { useSyncMutation } from "@/hooks/query";
import { popupState } from "@/store/common";
import {
  getMeApi,
  getMyReviewsApi,
  patchUserProfileApi,
} from "@/utils/api/mypage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

export const MYPAGE_REVIEWS_QUERY_KEY = "getReviews";
export const MYPAGE_ME_KEY = "getMe";
interface QueryProps {
  options?: any;
  email: string;
}

const useGetMyReviewList = ({ email, options }: QueryProps) => {
  return useQuery(getGetMyReviewConfig(email, options));
};

const useGetMe = () => {
  return useQuery([MYPAGE_ME_KEY], () => getMeApi());
};
function usePathcUserProfile() {
  const { status, data, update } = useSession();
  const [popup, setPopup] = useRecoilState(popupState);
  const queryClient = useQueryClient();

  return useSyncMutation(
    (data: { name: string; profileImage: string }) => patchUserProfileApi(data),
    {
      onSuccess: ({ name, image }: { name: string; image: string }) => {
        update({ name, image });
        setPopup({
          isOpen: false,
        });
        queryClient.refetchQueries([MYPAGE_ME_KEY]);
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

export { useGetMyReviewList, usePathcUserProfile, useGetMe };
