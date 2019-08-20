import React from 'react'
import App, {Container} from 'next/app'
import ReactGA from 'react-ga'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import classes from './_styles.scss'

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  componentDidMount() {
    ReactGA.initialize('UA-83352674-6')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <div className={classes.container}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Container>
    )
  }
}

export default MyApp
