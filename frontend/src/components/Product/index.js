import React from 'react';

class ProductDetail extends React.Component {
    state = {

    }

    render() {
        return (
            <div className="container bgwhite p-t-35 p-b-80">
                <div className="flex-w flex-sb">
                    <div className="w-size13 p-t-30 respon5">
                        <div className="wrap-slick3 flex-sb flex-w">
                            <img src="/images/R001-1.jpg" alt="IMG-PRODUCT" />
                        </div>
                    </div>
                    <div className="w-size14 p-t-30 respon5">
                        <h4 className="product-detail-name m-text16 p-b-13">
                            Boxy T-Shirt with Roll Sleeve Detail
                        </h4>
                        <span className="m-text17">
                            $22
				        </span>
                        <div className="p-b-15" style={{ marginTop: '10px' }}>
                            <span className="s-text8 m-r-35">Item No: R002</span><br />
                            <span className="s-text8">Material: Aluminum</span><br />
                            <span className="s-text8">Included Carrying Bags</span><br />
                            <span className="s-text8">Normal Graphic Size: 23.5" X 72"</span>
                        </div>
                        <div className="">
                            <div className="flex-m flex-w p-b-10 mt-3">
                                <div className="s-text15 mb-2">
                                    Special requests:
						        </div>

                                <textarea classnName="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20" name="message"></textarea>
                            </div>
                            <div className="flex-m flex-w p-b-10">
                                <div className="s-text15 w-size15 t-center">
                                    Pick UP Date:
						        </div>

                                <div className="rs2-select2 rs3-select2 bo4 of-hidden w-size16">
                                    <select className="selection-2" name="size" style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}>
                                        <option>Choose an option</option>
                                        <option value="20">24 hr.</option>
                                        <option value="10">48 hr.</option>
                                        <option value="3">3 days</option>
                                        <option value="4">4 days</option>
                                        <option value="5">5 days</option>
                                        <option value="6">1 week</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex-r-m flex-w p-t-10 p-b-40">
                                <div className="w-size16 flex-m flex-w">
                                    <div className="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
                                        <button className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                                            <i className="fs-12 fa fa-minus" aria-hidden="true"></i>
                                        </button>

                                        <input className="size8 m-text18 t-center num-product" type="number" name="num-product" value="1" />

                                        <button className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                                            <i className="fs-12 fa fa-plus" aria-hidden="true"></i>
                                        </button>
                                    </div>

                                    <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                                        <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                            Add to Cart
								        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
                                <h5 className="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                                    Description
						            <i className="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                                    <i className="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                                </h5>

                                <div className="dropdown-content dis-none p-t-15 p-b-23">
                                    <p className="s-text8">
                                        Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
						            </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProductDetail;