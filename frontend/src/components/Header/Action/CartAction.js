import React from 'react';

const CartAction = () => {
    return (
        <div className="header-wrapicon2">
            <img src="/images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown" alt="ICON" />
            <span className="header-icons-noti">0</span>
            <div className="header-cart header-dropdown">
                <ul className="header-cart-wrapitem">
                    <li className="header-cart-item">
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
                </ul>
                <div className="header-cart-total">Total: $75.00</div>
                <div className="header-cart-buttons">
                    <div className="header-cart-wrapbtn">
                        <a href="cart.html" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">View Cart</a>
                    </div>
                    <div className="header-cart-wrapbtn">
                        <a href="#" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">Check Out</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartAction;