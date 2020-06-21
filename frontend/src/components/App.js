import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import bannerShop from '../api/bannerShop';
import Header from './Header';
import Footer from './Footer';
import FeatureProduct from './FeatureProduct';
import Feature from './Feature';
import Login from './Login';
import SignUp from './SignUp';
import Category from './Category';
import Product from './Product';
import Cart from './Cart';
import About from './About';
import Contact from './Contact';
import CustomQuote from './CustomQuote';
import GlobalError from './Error';
import './App.css';

class App extends React.Component {
  state = {
    error: false,
    message: 'Internal server error',
    isLoggedIn: false,
    customer: {},
    user: {},
    products: [],
    previousPath: '/',
    cartItems: [],
    total: 0
  };

  async componentDidMount() {
    try {
      const oldToken = localStorage.getItem('token');
      let token = null;
      if (oldToken) {
        const res = await bannerShop.post('/api/auth/token/refresh/', {
          token: oldToken
        });
        token = res.data.token;
      }

      const user = jwtDecode(token);
      this.cartHandle();
      if (user) {
        this.setState({
          user: user,
          isLoggedIn: true
        });
      }
    } catch (err) {
      console.log(err);
      this.onLogout();
    }
  }

  onLogin = (customer, user) => {
    this.setState({
      customer: customer,
      user: user,
      isLoggedIn: true
    });
  }

  onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    this.setState({
      isLoggedIn: false
    });
  }

  previousPathHand = (path) => {
    this.setState({
      previousPath: path
    });
  }

  cartHandle = () => {
    if (localStorage.getItem('cart') !== null) {
      const cart = JSON.parse(localStorage.getItem('cart'));

      this.setState({
        cartItems: cart.cartItems,
        total: cart.total
      });
    } else {
      this.setState({
        cartItems: [],
        total: 0
      });
    }
  }

  clearCart = () => {
    localStorage.removeItem('cart');
    this.setState({
      cartItems: [],
      total: 0
    });
  }

  errorMount = (message) => {
    this.setState({
      error: true,
      message: message
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          onLogout={this.onLogout}
          cartItems={this.state.cartItems}
          total={this.state.total}
        />
        {this.state.error ? (
          <GlobalError message={this.state.message} />
        ) : ('')}
        <Switch>
          <Route path="/" exact>
            <FeatureProduct errorMount={this.errorMount} />
            {/* <Feature /> */}
          </Route>
          <Route path="/shop/cart" exact>
            <Cart
              isLoggedIn={this.state.isLoggedIn}
              previousPathHand={this.previousPathHand}
              cartHandle={this.cartHandle}
              clearCart={this.clearCart}
            />
          </Route>
          <Route path="/category/:id" exact>
            <Category />
          </Route>
          <Route path="/product/:id" exact>
            <Product
              errorMount={this.errorMount}
              user={this.state.user}
              cartHandle={this.cartHandle}
              isLoggedIn={this.state.isLoggedIn}
              previousPathHand={this.previousPathHand}
            />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/contact" exact>
            <Contact
              isLoggedIn={this.state.isLoggedIn}
              user={this.state.user}
              previousPathHand={this.previousPathHand}
            />
          </Route>
          {this.state.isLoggedIn ? (
            <Route path="/auth/login" exact>
              <Login
                isLoggedIn={this.state.isLoggedIn}
                onLogin={this.onLogin}
                previousPath={this.state.previousPath}
              />
            </Route>
          ) : <Redirect to="/" />}
          {this.state.isLoggedIn ? (
            <Route path="/auth/signup" exact>
              <SignUp />
            </Route>
          ) : <Redirect to="/" />}
          <Route>
            <CustomQuote path="/customquote" exact />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;