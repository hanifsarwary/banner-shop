import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = () => {
    return (
        <React.Fragment>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/category/banner">Banner</Link>
            </li>
            <li>
                <Link to="/">Poster</Link>
            </li>
            <li>
                <Link to="/">Stickers</Link>
            </li>
            <li>
                <Link to="/">Signs</Link>
            </li>
            <li>
                <Link to="/">Photo Printing</Link>
            </li>
            <li>
                <Link to="/">Digital Printing</Link>
            </li>
        </React.Fragment>
    )
}

export default MenuItems;