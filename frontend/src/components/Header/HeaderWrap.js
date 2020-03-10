import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Action from './Action';

const HeaderWrap = (props) => {
    console.log(props);
    return (
        <div className="wrap_header">
            <Logo classLogo="logo" />
            <Menu />
            <Action
                isLoggedIn={props.isLoggedIn}
                cartItems={props.cartItems}
                cartSubTotal={props.cartSubTotal}
                itemDelhand={props.itemDelhand}
                itemAddhand={props.itemAddhand}
            />
        </div>
    )
}

export default HeaderWrap;