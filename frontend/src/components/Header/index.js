import React from 'react';
import HeaderTopBar from './HeaderTopBar';
import HeaderWrap from './HeaderWrap';
import Mobile from './Mobile';
import MobileMenu from './MobileMenu'

const Header = (props) => {
    return (
        <header className="header1">
            <div className="container-menu-header">
                <HeaderTopBar />
                <HeaderWrap
                    isLoggedIn={props.isLoggedIn}
                    onLogout={props.onLogout}
                    cartItems={props.cartItems}
                    total={props.total}
                />
            </div>
            <Mobile />
            <MobileMenu />
        </header>
    )

}

export default Header;