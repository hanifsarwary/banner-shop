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
        prices: []
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
                                if (index === array.length - 1) {
                                    this.setState({
                                        prices: newPrices,
                                        total: newTotal,
                                        loaded: true
                                    })
                                }
                            })
                    } else {
                        new_options.push({
                            ...option,
                            sub: {
                                optionId: option.id,
                                subOptions: []
                            }
                        })
                        if (index === array.length - 1) {
                            this.setState({
                                loaded: true
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

    onQtychange = (event) => {
        this.setState({
            qty: event.target.value
        });
    }

    subOptionPricer = (e) => {
        let id = 1;
        let value = 0;
        let newTotal = 0;
        if (e.target.getAttribute('data-option')) {
            id = parseInt(e.target.getAttribute('data-option'));
            value = parseFloat(e.target.getAttribute('data-value'));
            newTotal = this.state.total + parseFloat(value);

            this.setState({
                total: newTotal
            })
        } else {
            id = parseInt(e.target[e.target.selectedIndex].getAttribute('data-option'));
            value = parseFloat(e.target[e.target.selectedIndex].getAttribute('data-value'));

            let newPrices = [...this.state.prices];
            const finded = this.state.prices.find(p => p.id === id);

            if (finded) {
                newTotal = (this.state.total - finded.value) + value;
                newPrices.push({
                    id: id,
                    value: value
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

    cartAddhandler = () => {
        let cart;

        const item = {
            id: this.state.detail.id,
            name: this.state.detail.product_name,
            imgURL: this.state.detail.default_product_image,
            price: this.state.total
        }

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
                                                                <option value={option.id} key={subOption.id} data-option={option.id} data-value={subOption.price}
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

                                    <textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20" name="message"></textarea>
                                </div>

                                <div className="flex-r-m flex-w p-t-10 p-b-40">
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