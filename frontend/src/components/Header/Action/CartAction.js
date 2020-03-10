import React from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

class CartAction extends React.Component {
    state = {
        dropdown: 'scale(0)',
        cartItems: [],
        total: 0,
        loaded: false
    }

    componentDidMount() {
        if (localStorage.getItem('cart') !== null) {
            const cart = JSON.parse(localStorage.getItem('cart'));

            this.setState({
                cartItems: cart.cartItems,
                total: cart.total
            });
        }
    }

    loadCart = () => {
        if (localStorage.getItem('cart') !== null) {
            const cart = JSON.parse(localStorage.getItem('cart'));

            if (this.state.dropdown === 'scale(1)') {
                this.setState({
                    dropdown: 'scale(0)'
                });
            } else {
                this.setState({
                    dropdown: 'scale(1)',
                    cartItems: cart.cartItems,
                    total: cart.total,
                    loaded: true
                });
            }
        } else {
            if (this.state.dropdown === 'scale(1)') {
                this.setState({
                    dropdown: 'scale(0)',
                    loaded: true
                });
            } else {
                this.setState({
                    dropdown: 'scale(1)',
                    loaded: true
                });
            }
        }
    }

    deleteCarthand = (e) => {
        let cart = {};
        cart.cartItems = [];
        cart.total = 0;
        const id = parseInt(e.target.getAttribute('data-id'));
        const cartItems = this.state.cartItems.filter((item) => item.id !== id);
        this.setState({
            cartItems: cartItems
        });
        cart.cartItems = cartItems;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    render() {
        return (
            <div className="header-wrapicon2">
                <img src="/images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown" alt="ICON" onClick={this.loadCart} />

                <div className="header-cart header-dropdown" style={{ transform: this.state.dropdown }}>
                    {this.state.loaded ? (
                        <ul className="header-cart-wrapitem">
                            {this.state.cartItems.map(item => {
                                return (
                                    <li className="header-cart-item" key={item.id}>
                                        <div className="header-cart-item-img" data-id={item.id} onClick={this.deleteCarthand}>
                                            <img src={item.imgURL} alt="IMG" />
                                        </div>
                                        <div className="header-cart-item-txt">
                                            <a href="/" className="header-cart-item-name">
                                                {item.name}
                                            </a>
                                        <span className="header-cart-item-info">${item.price}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                    ) : (
                            <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Loader type="TailSpin" color="#e65540" height={80} width={80} />
                            </div>
                        )}
                    <div className="header-cart-total">Total: ${this.state.total}</div>
                    <div className="header-cart-buttons">
                        <div className="header-cart-wrapbtn">
                            <Link
                                to="/shop/cart" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">View Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CartAction;