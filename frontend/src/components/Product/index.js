import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import bannerShop from '../../api/bannerShop';

class ProductDetail extends React.Component {
    state = {
        loaded: false,
        qty: 1,
        detail: {},
        options: [],
        total: 0,
        cartAdd: false,
        valid: true,
        required: false,
        addDesc: '',
        file: {},
        priceCalc: {},
        optionState: {},
        change: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const priceCalcObj = {};
        priceCalcObj.product_id = parseInt(id);
        priceCalcObj.quantity = 1;

        bannerShop.get(`/api/products/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    priceCalcObj.product_name = res.data.product_name;
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
                let newTotal = 0;
                priceCalcObj.options = {};
                const optionState = {};
                optionState["quantity"] = 1;

                opt.data.forEach((option, index, array) => {
                    if (option.is_suboptions) {
                        bannerShop.get(`/api/products/${id}/options/${option.id}/sub-options/`)
                            .then((res) => {
                                priceCalcObj.options[option.option_name] = [res.data[0].name, res.data[0].price];
                                optionState[option.option_name] = {};
                                optionState[option.option_name].id = res.data[0].id;
                                optionState[option.option_name].name = res.data[0].name;

                                new_options.push({
                                    ...option,
                                    sub: {
                                        optionId: option.id,
                                        subOptions: res.data
                                    }
                                })

                                if (index === array.length - 1) {
                                    bannerShop.post('/api/prices/', priceCalcObj)
                                        .then(data => {
                                            return data;
                                        })
                                        .then(res => {
                                            newTotal = res.data.price;

                                            this.setState({
                                                total: newTotal,
                                                priceCalc: priceCalcObj,
                                                optionState: optionState,
                                                loaded: true
                                            })
                                        }).catch(err => {
                                            console.log(err);
                                        })
                                }
                            })
                    } else {
                        priceCalcObj.options[option.option_name] = 1;
                        optionState[option.option_name] = 1;

                        new_options.push({
                            ...option,
                            sub: {
                                optionId: option.id,
                                subOptions: []
                            }
                        })

                        if (index === array.length - 1) {
                            bannerShop.post('/api/prices/', priceCalcObj)
                                .then(data => {
                                    return data;
                                })
                                .then(res => {
                                    newTotal = res.data.price;

                                    this.setState({
                                        total: newTotal,
                                        priceCalc: priceCalcObj,
                                        optionState: optionState,
                                        loaded: true
                                    })
                                }).catch(err => {
                                    console.log(err);
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

    changeHand = (e) => {
        const value = parseInt(e.target.value);
        const name = e.target.getAttribute('data-name');
        const optionState = {...this.state.optionState};

        if(value <= 0) {
            this.setState({
                optionState: optionState,
            })
        } else {
            optionState[name] = value;
            this.setState({
                optionState: optionState,
            })
        }
    }

    subOptionPricer = (e) => {
        this.setState({
            loaded: false,
            total: 0
        })

        const name = e.target[e.target.selectedIndex].getAttribute('data-name');
        const sub = e.target[e.target.selectedIndex].getAttribute('data-sub');
        const price = parseFloat(e.target[e.target.selectedIndex].getAttribute('data-price'));
        const id = parseInt(e.target[e.target.selectedIndex].getAttribute('data-id'));

        const priceCalcObj = {...this.state.priceCalc};
        const optionState = {...this.state.optionState};
        priceCalcObj.options[name] = [sub, price];
        optionState[name].id = id;
        optionState[name].name = sub;

        bannerShop.post('/api/prices/', priceCalcObj)
            .then(data => {
                return data;
            })
            .then(res => {
                const newTotal = res.data.price;
                this.setState({
                    total: newTotal,
                    priceCalc: priceCalcObj,
                    optionState: optionState,
                    loaded: true,
                })
            }).catch(err => {
                console.log(err);
            })
    }

    optionChangeCalc = (e) => {
        this.setState({
            loaded: false,
            total: 0
        })

        const name = e.target.getAttribute('data-name');
        const value = parseInt(e.target.value);

        const priceCalcObj = {...this.state.priceCalc};
        const optionState = {...this.state.optionState};

        if(name === "quantity") {
            priceCalcObj[name] = value;
        } else {
            priceCalcObj.options[name] = value;
        }

        optionState[name] = value;

        bannerShop.post('/api/prices/', priceCalcObj)
            .then(data => {
                return data;
            })
            .then(res => {
                const newTotal = res.data.price
                this.setState({
                    total: newTotal,
                    priceCalc: priceCalcObj,
                    optionState: optionState,
                    loaded: true,
                })
            }).catch(err => {
                console.log(err);
            })
    }

    addDescHand = (e) => {
        this.setState({
            addDesc: e.target.value,
            required: false,
            valid: true
        });
    }

    fileHand = (e) => {
        this.setState({
            file: e.target.files[0]
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
                file: this.state.file
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
                                ${this.state.total}
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
                                            value={this.state.optionState["quantity"]} data-name="quantity"
                                            onBlur={this.optionChangeCalc} onChange={this.changeHand}
                                        />
                                    </div>
                                </div>
                                {this.state.options.map((option) => {
                                    let value = this.state.optionState[option.option_name].id;
                                    return (
                                        <div className="flex-m flex-w" key={option.id}>
                                            <div className="s-text15 mb-2">
                                                {option.option_name}:
                                            </div>
                                            <div className="bo4 of-hidden size15 m-b-20">
                                                {option.is_suboptions ? (
                                                    <select className="selection-2" name="size"
                                                        style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}
                                                        onChange={this.subOptionPricer} value={value}
                                                    >
                                                        {option.sub.subOptions.map(subOption => {
                                                            return (
                                                                <option key={subOption.id} value={subOption.id}
                                                                    data-name={option.option_name} data-price={subOption.price} data-sub={subOption.name}
                                                                    data-id={subOption.id} 
                                                                >
                                                                    {subOption.name}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>

                                                ) : (
                                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="number"
                                                            value={this.state.optionState[option.option_name]} data-name={option.option_name}
                                                            onBlur={this.optionChangeCalc} onChange={this.changeHand}
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

                                {/* <div className="flex-m flex-w p-b-10 mt-3">
                                    <div className="s-text15 mb-2">
                                        File:
                                    </div>
                                    {this.state.required ? (
                                        <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                    ) : ('')}
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7" type="file"
                                            style={{ padding: '10px' }}
                                            onChange={this.fileHand}
                                        />
                                    </div>
                                </div> */}

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

                                {/* <div className="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
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
                                </div> */}
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