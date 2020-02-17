import React, { Component } from 'react';
import Logo from './Logo';
import Menu from './Menu';

const HeaderWrap = () => {
    return (
       <div className="wrap_header">
           <Logo />
           <Menu />
       </div>
    )
}

export default HeaderWrap;