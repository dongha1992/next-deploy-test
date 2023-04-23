import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import "@/styles/globals.css";
import "highlight.js/styles/stackoverflow-dark.css";
import Layout from "@/components/Layout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
