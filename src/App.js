import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from 'components/Container';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

import './App.css';

class App extends Component {
  state = {
    query: '',
  };

  onSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <Container title="Поиск изображений">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery query={query} />
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
