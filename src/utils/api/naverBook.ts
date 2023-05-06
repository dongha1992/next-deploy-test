import axios from "axios";

const naverBookApi = axios.create({
  baseURL: "https://openapi.naver.com/",
  headers: {
    "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
  },
});

const getNaverBooksApi = (query?: string): Promise<any[]> => {
  return naverBookApi
    .get(`v1/search/book.json?query=${query}`)
    .then(({ data }) => data);
};

export { getNaverBooksApi };
