import axios from "axios";
import { NaverBooks } from "./type";

const naverBookApi = axios.create({
  // baseURL: process.env.NEXTAUTH_URL,
  headers: {
    "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
  },
});

const getNaverBooksApi = (
  query: string = "",
  start: number = 1
): Promise<NaverBooks> => {
  return naverBookApi
    .get(
      `v1/search/book.json?query=${encodeURIComponent(
        query
      )}&display=10&start=${start}`
    )
    .then(({ data }) => data);
};

export { getNaverBooksApi };
