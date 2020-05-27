import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Action from './Action';

const HeaderWrap = (props) => {
    return (
        <div className="wrap_header">
            <Logo classLogo="logo" />
            <Menu />
            <Action
                isLoggedIn={props.isLoggedIn}
                onLogout={props.onLogout}
                cartItems={props.cartItems}
                total={props.total}
            />
        </div>
    )
}

export default HeaderWrap;