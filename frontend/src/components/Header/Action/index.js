import React, { Component } from 'react';
import UserAction from './UserAction';
import CartAction from './CartAction';

const Action = (props) => {
    return (
        <div className="header-icons">
            {props.isLoggedIn ? (
                <React.Fragment>
                    <UserAction />
                    <span className="linedivide1"></span>
                    <CartAction />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <a href="#" className="btn-cus flex-c-m size2 bg4 bo-rad-23 hov1 s-text1 trans-0-4">Login</a>
                    <span className="linedivide2"></span>
                    <a href="#" className="btn-cus flex-c-m size2 bg4 bo-rad-23 hov1 s-text1 trans-0-4">Signup</a>
                </React.Fragment>
            )}
        </div>
    )
}

export default Action;