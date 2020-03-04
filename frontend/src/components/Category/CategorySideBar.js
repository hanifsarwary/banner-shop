import React from 'react';

const CategorySideBar = () => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 p-b-50">
            <div className="leftbar p-r-20 p-r-0-sm">
                <div className="search-product pos-relative bo4 of-hidden">
                    <input className="s-text7 size6 p-l-23 p-r-50" type="text" name="search-product" placeholder="Search Products..." />

                    <button className="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
                        <i className="fs-12 fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategorySideBar;