import React from 'react';
import Loader from 'react-loader-spinner';
import bannerShop from '../../api/bannerShop'

class Cart extends React.Component {
    state = {
        loaded: false,
        cartItems: [],
        total: 0,
        subTotal: 0,
        orderLoad: false,
        completed: false,
        orderNum: '',
    };

    componentDidMount() {
        if (localStorage.getItem('cart') !== null) {
            const cart = JSON.parse(localStorage.getItem('cart'));

            this.setState({
                cartItems: cart.cartItems,
                total: cart.total,
                subTotal: cart.total,
                loaded: true
            });
        } else {
            this.setState({
                loaded: true
            });
        }
    }


    deleteCarthand = (e) => {
        let cart = {};
        let newTotal = 0;
        let newGrand = 0;
        cart.cartItems = [];
        cart.total = 0;
        const id = parseInt(e.target.getAttribute('data-id'));
        const cartItems = this.state.cartItems.filter((item) => item.id !== id);
        const finded = this.state.cartItems.filter((item) => item.id === id);
        newTotal = this.state.subTotal - finded[0].price;
        cart.total = newTotal;
        if (newTotal == 0) {
            newGrand = 0;
        } else {
            newGrand = this.state.total - newTotal;
        }
        this.setState({
            cartItems: cartItems,
            total: newGrand,
            subTotal: newTotal
        });
        cart.cartItems = cartItems;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    contOrder = () => {
        /* 
        status:
            # Cancelled
            # At Risk
            # Payment Pending
            # Completed
            # Delivered
            # In Progress
            # Yet To Start
        */
        this.setState({
            orderLoad: true
        });
        bannerShop.post('/api/orders/', {
            customer_required_date: '2020-05-25',
            details: 'Nothing much',
            start_date: '2020-05-25',
            status: 'Yet To Start',
            customer: 1
        })
            .then(res => {
                console.log(res);
                const orderNum = res.data.order_number;
                localStorage.removeItem('cart');
                this.setState({
                    orderLoad: false,
                    completed: true,
                    orderNum: orderNum
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (this.state.completed) {
            return (
                <section className="cart bgwhite p-t-70 p-b-100">
                    <div className="container">
                        <h1>Order is successfully Completed</h1>
                        <h4 style={{ marginTop: '10px' }}>Order Number is: {this.state.orderNum}</h4>
                    </div>
                </section>
            )
        } else {
            if (this.state.loaded) {
                return (
                    <React.Fragment>
                        <div className="sec-title p-b-10">
                            <h3 className="m-text5 t-center heading">Cart</h3>
                        </div>
                        {this.state.cartItems.length > 0 ? (
                            <section className="cart bgwhite p-t-70 p-b-100">
                                <div className="container">
                                    <div className="container-table-cart pos-relative">
                                        <div className="wrap-table-shopping-cart bgwhite">
                                            <table className="table-shopping-cart">
                                                <thead>
                                                    <tr className="table-head">
                                                        <th className="column-1"></th>
                                                        <th className="column-2">Product</th>
                                                        <th className="column-3">Quantity</th>
                                                        <th className="column-4">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.cartItems.map(item => {
                                                        return (
                                                            <tr className="table-row" key={item.id}>
                                                                <td className="column-1">
                                                                    <div className="cart-img-product b-rad-4 o-f-hidden" data-id={item.id} onClick={this.deleteCarthand}>
                                                                        <img src={item.imgURL} alt="IMG-PRODUCT" />
                                                                    </div>
                                                                </td>
                                                                <td className="column-2">{item.name}</td>
                                                                <td className="column-3">{item.qty}</td>
                                                                <td className="column-4">${item.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
    
                                            </table>
                                        </div>
                                    </div>
                                    <div className="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
                                        <div className="flex-w flex-m w-full-sm">
                                            <div className="size11 bo4 m-r-10">
                                                <input className="sizefull s-text7 p-l-22 p-r-22" type="text" name="coupon-code" placeholder="Coupon Code" />
                                            </div>
                                            <div className="size12 trans-0-4 m-t-10 m-b-10 m-r-10">
                                                <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">Apply coupon</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm">
                                        <h5 className="m-text20 p-b-24">Cart Totals</h5>
    
                                        <div className="flex-w flex-sb-m p-b-12">
                                            <span className="s-text18 w-size19 w-full-sm">Subtotal:</span>
    
                                            <span className="m-text21 w-size20 w-full-sm">${this.state.subTotal}</span>
                                        </div>
                                        {/* 
                                    <div className="flex-w flex-sb bo10 p-t-15 p-b-20">
                                        <span className="s-text18 w-size19 w-full-sm">Shipping:</span>
    
                                        <div className="w-size20 w-full-sm">
                                            <p className="s-text8 p-b-23">
                                                There are no shipping methods available. Please double check your address, or contact us if you need any help.
                                            </p>
    
                                            <span className="s-text19">Calculate Shipping</span>
    
                                            <div className="rs2-select2 rs3-select2 rs4-select2 bo4 of-hidden w-size21 m-t-8 m-b-12">
                                                <select className="selection-2" name="country" style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}>
                                                    <option>Select a country...</option>
                                                    <option>US</option>
                                                    <option>UK</option>
                                                    <option>Japan</option>
                                                </select>
                                            </div>
    
                                            <div className="size13 bo4 m-b-12">
                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="State /  country" />
                                            </div>
    
                                            <div className="size13 bo4 m-b-22">
                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text" name="postcode" placeholder="Postcode / Zip" />
                                            </div>
    
                                            <div className="size14 trans-0-4 m-b-10">
                                                <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                                    Update Totals
                                                </button>
                                            </div>
                                        </div>
                                    </div> */}
    
                                        <div className="flex-w flex-sb-m p-t-26 p-b-30">
                                            <span className="m-text22 w-size19 w-full-sm">Total:</span>
                                            <span className="m-text21 w-size20 w-full-sm">${this.state.total}</span>
                                        </div>
    
                                        <div className="size15 trans-0-4">
                                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4"
                                                onClick={this.contOrder}
                                            >
                                                {this.state.orderLoad ? (
                                                    <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                                        <Loader type="TailSpin" color="#fff" height={20} width={20} />
                                                    </div>
                                                ) : (
                                                        ""
                                                    )}
                                                Proceed to Checkout
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
    
                        ) : (
                                <section className="cart bgwhite p-t-70 p-b-100">
                                    <div className="container">
                                        <h1>Cart is empty</h1>
                                    </div>
                                </section>
                            )}
                    </React.Fragment>
                )
            } else {
                return (
                    <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <Loader type="TailSpin" color="#e65540" height={80} width={80} />
                    </div>
                )
            }
        }
    }
}

export default Cart;