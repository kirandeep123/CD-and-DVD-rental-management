import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

const cardsURL = 'https://jsonplaceholder.typicode.com/photos';

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      cardsData: null
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  renderCards() {
    fetch(cardsURL)
    .then(response => response.json())
    .then(json => this.setState({ cardsData: json }))
  }

  render() {
    const { Component, pageProps } = this.props;
    
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
