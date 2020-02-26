import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
    return(
        <div className="wrap-side-menu">
            <nav className="side-menu">
				<ul className="main-menu">
					<li className="item-menu-mobile">
                        <a href="product.html">Home</a>
					</li>

					<li className="item-menu-mobile">
						<a href="product.html">Shop</a>
					</li>

					<li className="item-menu-mobile">
						<a href="product.html">Sale</a>
					</li>

					<li className="item-menu-mobile">
						<a href="cart.html">Features</a>
					</li>

					<li className="item-menu-mobile">
						<a href="blog.html">Blog</a>
					</li>

					<li className="item-menu-mobile">
						<a href="about.html">About</a>
					</li>

					<li className="item-menu-mobile">
						<a href="contact.html">Contact</a>
					</li>
				</ul>
			</nav>
        </div>
    );
}

export default MobileMenu;