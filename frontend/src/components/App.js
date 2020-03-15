import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import bannerShop from '../api/bannerShop';
import jwtDecode from 'jwt-decode';
import history from 'history';
import jQuery from 'jquery';
import Header from './Header';
import Footer from './Footer';
import FeatureProduct from './FeatureProduct';
import Feature from './Feature';
import Login from './Login';
import Category from './Category';
import Product from './Product';
import Cart from './Cart';
import './App.css';
// import './vendor/jquery/jquery-3.2.1.min.js';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: {},
    products: []
  };

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      if(user) {
        this.setState({
          user: user,
          isLoggedIn: true
        });
      }
    } catch(err) {}

    bannerShop.get('/api/products/')
    .then((res) => {
      if(res.status === 200) {
        this.setState({
          products: res.data.results
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onLogin = ()=> {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header 
          isLoggedIn={this.state.isLoggedIn}
        />
        <Switch>
          <Route path="/" exact>
            <FeatureProduct />
            <Feature />
          </Route>
          <Route path="/shop/cart" exact>
            <Cart isLoggedIn={this.state.isLoggedIn} />
          </Route>
          <Route path="/category/:id" exact>
            <Category />
          </Route>
          <Route path="/product/:id" exact>
            <Product products={this.state.products}/>
          </Route>
          <Route path="/auth/login" exact>
            <Login 
              isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;