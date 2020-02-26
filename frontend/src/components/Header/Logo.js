import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const HeaderWrap = (props) => {
    return (
        <Link to="/" className={props.classLogo}>
            <img className="logo-custom" src="/images/logo.png" alt="logo" />
        </Link>
    )
}

export default HeaderWrap;