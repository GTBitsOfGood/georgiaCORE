import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/router'

import Header from "src/components/Header";
import fetchJson from "src/utils/lib/fetchJson";

import "focus-visible/dist/focus-visible.min.js";
import "normalize.css";
import "public/static/styles/App.css";
import "src/components/Nodes/RootNode/RootNode.css";
import "src/components/Nodes/OptionNode/OptionNode.css";
import "src/components/Nodes/TextNode/TextNode.css";

const MyApp = ({ Component, pageProps, session }) => {
  const router = useRouter();

  const PAGES_WITH_NO_HEADER = new Set(["/login", "/render"]);
  const renderHeader = !PAGES_WITH_NO_HEADER.has(router.pathname);

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (e) => console.error(e),
      }}
    >
      <Head>
        <title>GeorgiaCORE Tool</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <div className="App">
          {renderHeader && <Header />}
          <div className="Content">
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </div>
        </div>
      </SessionProvider>
    </SWRConfig>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default MyApp;
