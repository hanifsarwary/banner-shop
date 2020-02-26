import React from 'react';
import MenuItems from './MenuItems';

const Menu = () => {
    return (
        <div className="wrap_menu">
            <nav className="menu">
            <ul className="main_menu">
                <MenuItems />
            </ul>
            </nav>
        </div>
    )
}

export default Menu;