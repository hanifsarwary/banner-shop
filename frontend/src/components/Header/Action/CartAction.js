import React from 'react';
import { Link } from 'react-router-dom';

class CartAction extends React.Component {
    render() {
        return (
            <div className="header-wrapicon2">
                <img src="/images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown" alt="ICON" />
                <span className="header-icons-noti">0</span>
                <div className="header-cart header-dropdown">
                    <ul className="header-cart-wrapitem">
                        {/* {this.props.cartItems.map(item => {
                            return (
                                <li className="header-cart-item" key={item.id}>
                                    <div className="header-cart-item-img">
                                        <img src="/images/item-cart-01.jpg" alt="IMG" />
                                    </div>
                                    <div className="header-cart-item-txt">
                                        <a href="/" className="header-cart-item-name">
                                            White Shirt With Pleat Detail Back
                                        </a>
                                        <span className="header-cart-item-info">1 x $19.00</span>
                                    </div>
                                </li>
                            );
                        })} */}
                    </ul>
                    <div className="header-cart-total">Total: $75.00</div>
                    <div className="header-cart-buttons">
                        <div className="header-cart-wrapbtn">
                            <Link
                                to="/shop/cart" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">View Cart</Link>
                        </div>
                        <div className="header-cart-wrapbtn">
                            <Link to="/" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">Check Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CartAction;