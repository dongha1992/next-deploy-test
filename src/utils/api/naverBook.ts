import axios from "axios";

const naverBookApi = axios.create({
  headers: {
    "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    "Access-Control-Allow-Origin": "https://openapi.naver.com/",
  },
});

const getNaverBooksApi = (query: string = ""): Promise<any[]> => {
  return naverBookApi
    .get(`v1/search/book.json?query=${encodeURIComponent(query)}`)
    .then(({ data }) => data);
};

export { getNaverBooksApi };
