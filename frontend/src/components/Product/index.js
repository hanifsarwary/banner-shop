import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import bannerShop from '../../api/bannerShop';

class ProductDetail extends React.Component {
    state = {
        loaded: false,
        qty: 1,
        width: 0,
        detail: {},
        pre: [],
        options: [],
        total: 0,
        prices: [],
        cartAdd: false,
        valid: true,
        required: false,
        addDesc: '',
        optDet: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        bannerShop.get(`/api/products/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        detail: res.data,
                        total: res.data.one_unit_weight
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        bannerShop.get(`/api/products/${id}/options`)
            .then((res) => {
                return res;
            })
            .then((opt) => {
                const new_options = [];
                let newPrices = [];
                let newTotal = 0;

                let newOptDet = [];

                opt.data.forEach((option, index, array) => {
                    if (option.is_suboptions) {
                        bannerShop.get(`/api/products/${id}/options/${option.id}/sub-options/`)
                            .then((res) => {
                                new_options.push({
                                    ...option,
                                    sub: {
                                        optionId: option.id,
                                        subOptions: res.data
                                    }
                                })
                                // console.log(res.data[0].price);
                                newTotal = newTotal + res.data[0].price;
                                newPrices.push({
                                    id: option.id,
                                    value: res.data[0].price
                                });
                                newOptDet.push({
                                    id: option.id,
                                    sub: res.data[0].id,
                                    qty: 1,
                                    price: res.data[0].price
                                });
                                if (index === array.length - 1) {
                                    this.setState({
                                        prices: newPrices,
                                        total: newTotal,
                                        loaded: true,
                                        optDet: newOptDet
                                    })
                                }
                            })
                    } else {
                        newTotal = newTotal + option.one_unit_price;
                        new_options.push({
                            ...option,
                            sub: {
                                optionId: option.id,
                                subOptions: []
                            }
                        })
                        newOptDet.push({
                            id: option.id,
                            sub: null,
                            qty: 1,
                            price: option.one_unit_price
                        });
                        if (index === array.length - 1) {
                            this.setState({
                                total: newTotal,
                                loaded: true,
                                optDet: newOptDet
                            })
                        }
                    }
                })

                this.setState({
                    options: new_options,
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        if (this.state.loaded && this.state.cartAdd) {
            window.setTimeout(() => {
                this.setState({
                    cartAdd: false
                });
            }, 3000);
        }
    }

    onQtychange = (event) => {
        this.setState({
            qty: event.target.value
        });
    }

    subOptionPricer = (e) => {
        let id = 1;
        let value = 0;
        let newTotal = 0;
        let sub = 0;
        let qty = 0;

        if (e.target.getAttribute('data-option')) {
            id = parseInt(e.target.getAttribute('data-option'));
            value = parseFloat(e.target.getAttribute('data-value'));
            qty = parseFloat(e.target.value);

            let newOptDet = [];
            const OptDetfinded = this.state.optDet.find(p => p.id === id);

            if (OptDetfinded) {
                newOptDet = this.state.optDet.filter(p => p.id !== id);
                newOptDet.push({
                    id: id,
                    sub: null,
                    qty: qty,
                    price: value
                });
                this.setState({
                    optDet: newOptDet,
                });
            } else {
                newOptDet.push({
                    id: id,
                    sub: null,
                    qty: qty,
                    price: value
                });
                this.setState({
                    optDet: newOptDet,
                });
            }

            let newPrices = [...this.state.prices];
            const finded = this.state.prices.find(p => p.id === id);

            if (finded) {
                newTotal = this.state.total - value;
                newPrices.push({
                    id: id,
                    value: value,
                    sub: sub
                })
            } else {
                newTotal = this.state.total + value;

                newPrices.push({
                    id: id,
                    value: value
                })
            }

            this.setState({
                prices: newPrices,
                total: newTotal
            })
        } else {
            id = parseInt(e.target[e.target.selectedIndex].getAttribute('data-option'));
            value = parseFloat(e.target[e.target.selectedIndex].getAttribute('data-value'));
            sub = parseFloat(e.target[e.target.selectedIndex].getAttribute('data-id'));

            let newOptDet = [];
            const OptDetfinded = this.state.optDet.find(p => p.id === id);

            if (OptDetfinded) {
                newOptDet = this.state.optDet.filter(p => p.id !== id);
                newOptDet.push({
                    id: id,
                    sub: sub,
                    qty: 1,
                    price: value
                });
                this.setState({
                    optDet: newOptDet,
                });
            } else {
                newOptDet.push({
                    id: id,
                    sub: null,
                    qty: qty,
                    price: value
                });
                this.setState({
                    optDet: newOptDet,
                });
            }

            let newPrices = [...this.state.prices];
            const finded = this.state.prices.find(p => p.id === id);

            if (finded) {
                newTotal = (this.state.total - finded.value) + value;
                newPrices.push({
                    id: id,
                    value: value,
                    sub: sub
                })
            } else {
                newTotal = this.state.total + value;

                newPrices.push({
                    id: id,
                    value: value
                })
            }

            this.setState({
                prices: newPrices,
                total: newTotal
            })
        }
    }

    addDescHand = (e) => {
        this.setState({
            addDesc: e.target.value,
            required: false,
            valid: true
        });
    }

    cartAddhandler = () => {
        if (this.state.addDesc === '') {
            this.setState({
                required: true,
                valid: false
            });
        } else {
            let cart;

            const item = {
                id: this.state.detail.id,
                name: this.state.detail.product_name,
                imgURL: this.state.detail.default_product_image,
                price: this.state.total,
                qty: this.state.qty,
                special_note: this.state.addDesc,
            }

            item.productOrderOptions = this.state.optDet;

            if (localStorage.getItem('cart') === null) {
                cart = {};
                cart.cartItems = [];
                cart.total = 0;
            } else {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.cartItems.push(item);
            cart.total = cart.total + this.state.total;

            localStorage.setItem('cart', JSON.stringify(cart));
            this.setState({
                cartAdd: true
            });
        }
    }

    render() {
        console.log(this.state);
        if (this.state.loaded) {
            return (
                <div className="container bgwhite p-t-35 p-b-80">
                    <div className="flex-w flex-sb">
                        <div className="w-size13 p-t-30 respon5">
                            <div className="wrap-slick3 flex-sb flex-w">
                                <img src={this.state.detail.default_product_image} alt="IMG-PRODUCT" style={{ width: '100%', height: 'auto' }} />
                            </div>
                        </div>
                        <div className="w-size14 p-t-30 respon5">
                            <h4 className="product-detail-name m-text16 p-b-13">
                                {this.state.detail.product_name}
                            </h4>
                            <span className="m-text17">
                                ${this.state.total * this.state.qty}
                            </span>
                            <div className="p-b-15" style={{ marginTop: '10px' }}>
                                <span className="s-text8 m-r-35">Item No: R002</span><br />
                                <span className="s-text8">Material: Aluminum</span><br />
                                <span className="s-text8">Included Carrying Bags</span><br />
                                <span className="s-text8">Normal Graphic Size: 23.5" X 72"</span>
                            </div>

                            <div className="">
                                <div className="flex-m flex-w">
                                    <div className="s-text15 mb-2">
                                        Quantity:
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="number"
                                            value={this.state.qty}
                                            onChange={this.onQtychange}
                                        />
                                    </div>
                                </div>
                                {this.state.options.map((option) => {
                                    return (
                                        <div className="flex-m flex-w" key={option.id}>
                                            <div className="s-text15 mb-2">
                                                {option.option_name}:
                                            </div>
                                            <div className="bo4 of-hidden size15 m-b-20">
                                                {option.is_suboptions ? (
                                                    <select className="selection-2" name="size"
                                                        style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}
                                                        onChange={this.subOptionPricer}
                                                    >
                                                        {option.sub.subOptions.map(subOption => {
                                                            return (
                                                                <option value={option.id} key={subOption.id}
                                                                    data-option={option.id} data-value={subOption.price}
                                                                    id={subOption.id}
                                                                >
                                                                    {subOption.name}
                                                                </option>)
                                                        })}
                                                    </select>

                                                ) : (
                                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="number" onChange={this.subOptionPricer}
                                                            defaultValue="1" data-option={option.id} data-value={option.one_unit_price}
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="flex-m flex-w p-b-10 mt-3">
                                    <div className="s-text15 mb-2">
                                        Additional Instructions:
                                    </div>
                                    {this.state.required ? (
                                        <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                    ) : ('')}
                                    <textarea
                                        className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                                        name="message"
                                        value={this.state.addDesc}
                                        onChange={this.addDescHand}
                                    ></textarea>
                                </div>

                                <div className="flex-r-m flex-w p-t-10 p-b-40">
                                    {this.state.cartAdd ? (
                                        <span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>Product added to cart</span>
                                    ) : (
                                            ""
                                        )}

                                    {!this.state.valid ? (
                                        <span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>* These fields are required</span>
                                    ) : (
                                            ""
                                        )}
                                    <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                                        <button
                                            className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4"
                                            onClick={this.cartAddhandler}
                                        >
                                            Add to Cart
                                        </button>
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
        } else {
            return (
                <div className="container bgwhite p-t-35 p-b-80">
                    <div className="container">
                        <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                            <Loader type="TailSpin" color="#e65540" height={80} width={80} />
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default withRouter(ProductDetail);