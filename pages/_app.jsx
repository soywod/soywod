import React from "react"
import App from "next/app"
import ReactGA from "react-ga"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import classes from "./_styles.scss"

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
      <div className={classes.container}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    )
  }
}

export default MyApp
