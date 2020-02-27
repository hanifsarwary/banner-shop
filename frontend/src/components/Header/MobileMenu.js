import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
    return(
        <div className="wrap-side-menu">
            <nav className="side-menu">
				<ul className="main-menu">
					<li className="item-menu-mobile">
						<Link to="/">Home</Link>
					</li>
					<li className="item-menu-mobile">
						<Link to="/auth/login">Banner</Link>
					</li>
					<li className="item-menu-mobile">
						<Link to="/">Poster</Link>
					</li>
					<li className="item-menu-mobile">
						<Link to="/">Stickers</Link>
					</li>
					<li className="item-menu-mobile">
						<Link to="/">Signs</Link>
					</li>
					<li className="item-menu-mobile">
						<Link to="/">Photo Printing</Link>
					</li>
					<li className="item-menu-mobile">
						<Link to="/">Digital Printing</Link>
					</li>
				</ul>
			</nav>
        </div>
    );
}

export default MobileMenu;