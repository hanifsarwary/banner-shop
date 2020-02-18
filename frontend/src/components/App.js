import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Feature from './Feature';
import './App.css';
// import './vendor/jquery/jquery-3.2.1.min.js';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Feature />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;