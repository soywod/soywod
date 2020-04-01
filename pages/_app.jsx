import React from "react"
import App from "next/app"
import ReactGA from "react-ga"

import Navbar from "../_shared/navbar"
import Footer from "../_shared/footer"

import cs from "./_app.scss"

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <div className={cs.container}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    )
  }
}

export default MyApp
