import React, { Component } from 'react';
import HeaderTopBar from './HeaderTopBar';
import HeaderWrap from './HeaderWrap';

const Header = () => {
    return (
        <header className="header1">
            <div className="container-menu-header">
                <HeaderTopBar />
                <HeaderWrap />
            </div>
        </header>
    )

}

export default Header;