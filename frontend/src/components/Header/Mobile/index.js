import React from 'react';
import Logo from '../Logo';
import MobileAction from '../MobileAction';
import Hamburger from '../Hamburger';

const Mobile = () => {
  return (
    <div className="wrap_header_mobile">
      <Logo classLogo="logo-mobile" />
      <div className="btn-show-menu">
        <MobileAction />
        <Hamburger />
      </div>
    </div>
  );
}

export default Mobile;