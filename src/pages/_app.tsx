import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";
import "highlight.js/styles/stackoverflow-dark.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "@/components/Layout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const queryClient = useRef<QueryClient>();

  if (!queryClient.current) {
    queryClient.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  }

  const initKakao = () => {
    try {
      if (!window.Kakao.isInitialized()) {
        if (typeof window !== undefined) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedProps}>
        <SessionProvider session={pageProps.session}>
          <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
