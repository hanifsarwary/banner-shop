import React from 'react';

const HeaderTopBar = () => {
    return (
        <div className="topbar">
            <div className="topbar-social">
                <a href="/1" className="topbar-social-item fa fa-facebook">

                </a>
                <a href="/2" className="topbar-social-item fa fa-instagram">

                </a>
                <a href="/3" className="topbar-social-item fa fa-youtube-play">
                    
                </a>
            </div>

            <span className="topbar-child1">
                Hotline: (415)682-7777, (650)993-6191
            </span>

            <div className="topbar-child2">
                <span className="topbar-email">
                    sales@bannershopusa.com
				</span>
            </div>
        </div>
    )

}

export default HeaderTopBar;