import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode, useRef } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";
import "highlight.js/styles/stackoverflow-dark.css";
import Layout from "@/components/Layout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedProps}>
        <SessionProvider session={pageProps.session}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
