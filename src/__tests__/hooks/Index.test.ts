import { renderHook, act } from "@testing-library/react";
import { useAsync } from "@/hooks/useAsync";

const DEFAULT_RESULT = {
  status: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setReset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

const PENDING_RESULT = {
  status: "pending",
  data: null,
  error: null,

  isIdle: false,
  isLoading: true,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setReset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

test("프로미스를 호출한다.", async () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const { result } = renderHook(() => useAsync());

  expect(result.current).toEqual(DEFAULT_RESULT);
  act(() => {
    result.current.run(promise);
  });

  expect(result.current).toEqual(PENDING_RESULT);
});
