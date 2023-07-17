import { renderHook, act } from "@testing-library/react";
import { StatusType, useAsync } from "@/hooks/useAsync";

// test isolation

beforeEach(() => {
  jest.spyOn(console, "error");
});

// afterEach(() => {
//   console.error.mockRestore();
// });

const deferred = () => {
  let resolve: any, reject: any;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

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

const resolvedValue = Symbol("resolved value");

const SUCCESS_RESULT = {
  status: "resolved",
  error: null,
  data: resolvedValue,

  isIdle: false,
  isLoading: false,
  isError: false,
  isSuccess: true,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  setReset: expect.any(Function),
};

const rejectedValue = Symbol("rejected value");

const FAIL_RESULT = {
  status: "rejected",
  error: rejectedValue,
  data: null,

  isIdle: false,
  isLoading: false,
  isError: true,
  isSuccess: false,

  run: expect.any(Function),
  setReset: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

test("프로미스를 호출하고 resolved를 받고 리셋까지 한다.", async () => {
  const { promise, resolve } = deferred();

  const { result } = renderHook(() => useAsync());

  expect(result.current).toEqual(DEFAULT_RESULT);

  let response: Promise<any>;

  act(() => {
    response = result.current.run(promise);
  });
  expect(result.current).toEqual(PENDING_RESULT);

  await act(async () => {
    resolve(resolvedValue);
    await response;
  });
  expect(result.current).toEqual(SUCCESS_RESULT);

  act(() => {
    result.current.setReset();
  });

  expect(result.current).toEqual(DEFAULT_RESULT);
});

test("프로미스를 호출하고 rejected를 받고 리셋까지 한다.", async () => {
  const { promise, reject } = deferred();

  // use..는 hook 함수 내부에서만 호출할 수 있기 때문에 renderHook을 사용하여 hook 함수를 호출한다.
  const { result } = renderHook(() => useAsync());

  expect(result.current).toEqual(DEFAULT_RESULT);

  let response: any;
  act(() => {
    response = result.current.run(promise);
  });

  expect(result.current).toEqual(PENDING_RESULT);

  await act(async () => {
    reject(rejectedValue);
    await response.catch(() => {
      // error는 무시함
    });
  });

  expect(result.current).toEqual(FAIL_RESULT);

  act(() => {
    result.current.setReset();
  });
  expect(result.current).toEqual(DEFAULT_RESULT);
});

test("커스텀 state를  호출한다.", async () => {
  const customInitialState: { status: StatusType; data: any } = {
    status: "resolved",
    data: resolvedValue,
  };
  const { result } = renderHook(() => useAsync(customInitialState));

  expect(result.current).toEqual(SUCCESS_RESULT);
});

test("setData를 할 수 있다.", async () => {
  const { result } = renderHook(() => useAsync());
  act(() => {
    result.current.setData(resolvedValue);
  });
  expect(result.current).toEqual(SUCCESS_RESULT);
});

test("setError를 할 수 있다.", async () => {
  const { result } = renderHook(() => useAsync());
  act(() => {
    result.current.setError(rejectedValue);
  });
  expect(result.current).toEqual(FAIL_RESULT);
});

test("펜딩일 때 컴포넌트가 언마운트가 되면, 스테이트 업데이트를 하지 않는다.", async () => {
  const { promise, resolve } = deferred();
  const { result, unmount } = renderHook(() => useAsync());

  let response: Promise<any>;
  act(() => {
    response = result.current.run(promise);
  });
  unmount();

  // unmount 되었기 때문에 pending 상태로 남아있어야 한다.
  await act(async () => {
    resolve();
    await response;
  });

  expect(console.error).not.toHaveBeenCalled();
});

test("promise 없이 run을 호출하면 에러가 발생한다.", async () => {
  const { result } = renderHook(() => useAsync());
  expect(() => result.current.run()).toThrowErrorMatchingInlineSnapshot(`"promise가 아닙니다."`);
});
