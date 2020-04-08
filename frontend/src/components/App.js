import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
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
import './App.css';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: {},
    products: [],
    previousPath: '/'
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
  }

  onLogin = ()=> {
    this.setState({
      isLoggedIn: true
    });
  }

  onLogout = ()=> {
    this.setState({
      isLoggedIn: false
    });
  }

  previousPathHand = (path) => {
    this.setState({
      previousPath: path
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header 
          isLoggedIn={this.state.isLoggedIn}
          onLogout={this.onLogout}
        />
        <Switch>
          <Route path="/" exact>
            <FeatureProduct />
            <Feature />
          </Route>
          <Route path="/shop/cart" exact>
            <Cart isLoggedIn={this.state.isLoggedIn} previousPathHand={this.previousPathHand}/>
          </Route>
          <Route path="/category/:id" exact>
            <Category />
          </Route>
          <Route path="/product/:id" exact>
            <Product />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/contact" exact>
            <Contact isLoggedIn={this.state.isLoggedIn} previousPathHand={this.previousPathHand}/>
          </Route>
          <Route path="/auth/login" exact>
            <Login 
              isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin} previousPath={this.state.previousPath}
            />
          </Route>
          <Route path="/auth/signup" exact>
            <SignUp />
          </Route>
          <Route>
            <CustomQuote path="/customquote" exact/>
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;