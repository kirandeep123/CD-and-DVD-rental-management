import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import "isomorphic-fetch";

const cardsURL = 'https://jsonplaceholder.typicode.com/photos';

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      cardsData: []
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentWillMount() {
    this.renderCards();
  }

  renderCards() {
    fetch(cardsURL)
    .then(response => response.json())
    .then(json => this.setState({ cardsData: json.slice(0, 100) }))
  }

  render() {
    const { Component, pageProps } = this.props;
    console.log(this.state)
    return (
      <Container>
        <Head>
          <title>CD Inventory</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} cardsData={this.state.cardsData} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
