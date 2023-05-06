import {
  Dispatch,
  useCallback,
  useLayoutEffect,
  useReducer,
  useRef,
} from "react";

// https://gist.github.com/velopert/554ab444fd1731e3047c4adde10ed36d 참고

type PendingAction = {
  status: "pending";
};

type ResolvedAction<T> = {
  status: "resolved";
  data: T;
};

type RejectedAction<E> = {
  status: "rejected";
  error: E;
};

export type AsyncState<D, E> = {
  status: "idle" | "pending" | "resolved" | "rejected";
  data: D | null;
  error: E | null;
};

export type AsyncAction<D, E> =
  | RejectedAction<E>
  | PendingAction
  | ResolvedAction<D>;

function useSafeDispatch<D, E>(
  dispatch: Dispatch<AsyncAction<D, E>>
): Dispatch<AsyncAction<D, E>> {
  const mountedRef = useRef(false);

  useLayoutEffect((): void | any => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  return useCallback(
    (action) => {
      if (mountedRef.current) {
        dispatch({ ...action });
      }
    },
    [dispatch]
  );
}

const asyncReducer = <D, E>(
  state: AsyncState<D, E>,
  action: AsyncAction<D, E>
): AsyncState<D, E> => ({
  ...state,
  ...action,
});

const defaultInitialState = { status: "idle", data: null, error: null };

function useAsync<D, E>(initialState?: AsyncState<D, E>) {
  const initialStateRef = useRef({ ...defaultInitialState, ...initialState });

  const [{ status, data, error }, setState] = useReducer(
    asyncReducer,
    initialStateRef.current as AsyncState<D, E>
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data: D) => {
      return safeSetState({ data, status: "resolved" });
    },
    [safeSetState]
  );

  const setError = useCallback(
    (error: E) => {
      return safeSetState({ error, status: "rejected" });
    },
    [safeSetState]
  );

  const setReset = useCallback(() => {
    return () => safeSetState(initialStateRef.current as AsyncAction<D, E>);
  }, [safeSetState]);

  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error("promise가 아닙니다.");
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data: D) => {
          setData(data);
          return data;
        },
        (error: E) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    setReset,
  };
}

export { useAsync };
