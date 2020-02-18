import React, { Component } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Action from './Action';

const HeaderWrap = () => {
    return (
       <div className="wrap_header">
           <Logo />
           <Menu />
           <Action />
       </div>
    )
}

export default HeaderWrap;