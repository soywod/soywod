import {FC} from "react";
import Head from "next/head";
import {AppProps} from "next/app";

import Navbar from "../_shared/navbar";
import Footer from "../_shared/footer";
import "./_app.scss";
import cs from "./_app.module.scss";

const App: FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={cs.container}>
        <Navbar lang={pageProps.lang} />
        <Component {...pageProps} />
        <Footer lang={pageProps.lang} />
      </div>
    </>
  );
};

export default App;
