import React from 'react';
import UserAction from '../Action/UserAction';
import CartAction from '../Action/CartAction';

const MobileAction = () => {
    return (
        <div className="header-icons-mobile">
            <UserAction />
            <span className="linedivide2"></span>
            <CartAction />
        </div>
    );
}

export default MobileAction;