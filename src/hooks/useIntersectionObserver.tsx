import { UseQueryResult } from "@tanstack/react-query";
import React, { useState, useEffect, useCallback } from "react";

export interface IUseInfinite {
  fetchNextPage: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
  isFetching: boolean;
  childRef: any;
  parentRef: any;
  totalPage: number;
  currentPage: number;
}

const useIntersectionObserver = ({
  fetchNextPage,
  totalPage,
  childRef,
  parentRef,
  isFetching,
  currentPage,
}: IUseInfinite) => {
  const [page, setPage] = useState<number>(0);

  const option = {
    root: parentRef?.current!, // 관찰대상의 부모요소를 지정
    rootMargin: "0px", // 관찰하는 뷰포트의 마진 지정
    threshold: 1.0,
  };

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, option);

    if (childRef?.current) {
      observer.observe(childRef?.current);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleObserver]);

  useEffect(() => {
    if (!isFetching) {
      if (currentPage < totalPage!) {
        fetchNextPage();
      }
    }
  }, [page, fetchNextPage, isFetching, currentPage, totalPage]);

  return { page };
};

export default useIntersectionObserver;
