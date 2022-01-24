import NextDocument, {Html, Head, Main, NextScript} from "next/document";
import {I18nextProvider} from "react-i18next";

import i18n from "../_shared/i18n";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700&display=swap" />
          <link rel="preload" href="/fonts/Quicksand-Regular.woff2" as="font" crossOrigin="true" />
          <link rel="preload" href="/fonts/SpaceMono-Regular.woff2" as="font" crossOrigin="true" />

          <meta charSet="utf-8" />
          <meta name="author" content="Clément DOUIN" />
          <meta name="msapplication-TileColor" content="#1976d2" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="theme-color" content="#1976d2" />
          <meta property="og:image" content="/avatar.jpeg" />
          <meta name="twitter:image" content="/avatar.jpeg" />
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <I18nextProvider i18n={i18n}>
            <Main />
          </I18nextProvider>
          <NextScript />
          <noscript>You need to enable JavaScript to run this blog.</noscript>
        </body>
      </Html>
    );
  }
}

export default Document;
