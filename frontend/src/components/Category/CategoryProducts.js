import React from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const CategoryProducts = (props) => {
    if (props.loaded) {
        return (
            <div className="col-sm-6 col-md-8 col-lg-9 p-b-50">
                <div className="flex-sb-m flex-w p-b-35">
                    <span className="s-text8 p-t-5 p-b-5">
                        Showing 1–1 of {props.items.length} results
                    </span>
                </div>
                <div className="row">
                    {props.items.map((item) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 p-b-50" key={item.id}>
                                <div className="block2">
                                    <div className="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew" style={{ height: '300px' }}>
                                        <img src={item.default_product_image} alt="IMG-PRODUCT" />
                                    </div>
                                    <div className="block2-txt p-t-20">
                                        <Link to={`/product/${item.id}`} className="block2-name dis-block s-text3 p-b-5" style={{ textTransform: 'capitalize' }}>
                                            {item.product_name}
                                        </Link>
                                        <ul className="product-feature">
                                            {/* 'Size: 33.5" X 80"', 'Included Carrying Bags', '6-Month Hardware Warranty', 'Lightweight & Portable' */}
                                            <li >
                                                <i className="fa fa-check"></i>
                                                <span>Included Carrying Bags</span>
                                            </li>
                                            <li >
                                                <i className="fa fa-check"></i>
                                                <span>6-Month Hardware Warranty</span>
                                            </li>
                                            <li >
                                                <i className="fa fa-check"></i>
                                                <span>Lightweight &amp; Portable</span>
                                            </li>

                                        </ul>

                                        <span className="block2-price m-text6 p-r-5 mt-1" style={{ fontWeight: 'bold', color: '#e65540' }}>
                                            {`$${item.one_unit_weight}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div className="col-sm-6 col-md-8 col-lg-9 p-b-50">
                <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <Loader type="TailSpin" color="#e65540" height={80} width={80} />
                </div>
            </div>
        );
    }
}

export default CategoryProducts;