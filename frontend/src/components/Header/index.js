import React, { Component } from 'react';
import HeaderTopBar from './HeaderTopBar';
import HeaderWrap from './HeaderWrap';
import Mobile from './Mobile';
import MobileMenu from './MobileMenu'

const Header = () => {
    return (
        <header className="header1">
            <div className="container-menu-header">
                <HeaderTopBar />
                <HeaderWrap />
            </div>
            <Mobile />
            <MobileMenu />
        </header>
    )

}

export default Header;