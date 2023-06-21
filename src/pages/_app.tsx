import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode, useRef, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DefaultSeo } from "next-seo";

import "@/styles/globals.scss";
import "@/styles/app.scss";

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
import { Analytics } from "@vercel/analytics/react";

import useKakao from "@/hooks/useKakao";
import { DEFAULT_SEO } from "@/constants";
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  useKakao();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedProps}>
          <SessionProvider session={pageProps.session}>
            <DefaultSeo {...DEFAULT_SEO} />
            <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
            <Analytics />
            <ReactQueryDevtools initialIsOpen={false} />
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
