import Axios from "axios";

const apiClient = Axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

// export { apiClient };

apiClient.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      return Promise.reject({ message: "다시 인증해주세요." });
    }
    return response;
  },
  (err: any) => {
    const message = err?.response?.data?.message ?? "네트워크 에러입니다.";
    throw new Error(message);
    // return Promise.reject('에러 발생');
  }
);

apiClient.interceptors.request.use((req) => {
  return req;
});

export { apiClient };
