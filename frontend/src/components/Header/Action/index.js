import React, { Component } from 'react';
import UserAction from './UserAction';
import CartAction from './CartAction';

const Action = () => {
    return (
        <div className="header-icons">
            <UserAction />
            <span className="linedivide1"></span>
            <CartAction />
        </div>
    )
}

export default Action;