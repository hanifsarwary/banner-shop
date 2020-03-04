import React from 'react';
import { Link } from 'react-router-dom';

const CategoryProducts = (props) => {
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
                                    <img src={item.imgURL} alt="IMG-PRODUCT" />

                                    <div className="block2-overlay trans-0-4">
                                        <div className="block2-btn-addcart w-size1 trans-0-4">
                                            <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="block2-txt p-t-20">
                                    <Link to={`/product/${item.id}`} className="block2-name dis-block s-text3 p-b-5" style={{ textTransform: 'capitalize' }}>
                                        {item.name}
                                    </Link>
                                    <ul className="product-feature">
                                        {item.features.map((feature) => {
                                            return (
                                                <li>
                                                    <i className="fa fa-check"></i>
                                                    <span>{feature}</span>
                                                </li>
                                            )
                                        })}

                                    </ul>

                                    <span className="block2-price m-text6 p-r-5 mt-1" style={{ fontWeight: 'bold', color: '#e65540' }}>
                                        {`$${item.price}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default CategoryProducts;