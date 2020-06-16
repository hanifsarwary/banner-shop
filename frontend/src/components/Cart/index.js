import React from 'react';
import Loader from 'react-loader-spinner';
import { objectToFormData } from 'object-to-formdata';
import { withRouter } from 'react-router-dom';
import bannerShop from '../../api/bannerShop';
import jwtDecode from 'jwt-decode';

class Cart extends React.Component {
    state = {
        loaded: false,
        cartItems: [],
        total: 0,
        subTotal: 0,
        orderLoad: false,
        completed: false,
        orderNum: '',
        order: {},
        shipping: 'No Shipment',
        shipForm: false,
        deleting: false,
        user: null,
        shipping_id: null,
        shipping_contact_name: '',
        shipping_street_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_zip_code: ''
    };

    async componentDidMount() {
        try {
            if (this.props.isLoggedIn) {
                const token = localStorage.getItem('token');
                const user = jwtDecode(token);

                if (user) {
                    this.setState({
                        user: user,
                    });
                }

                const result = await bannerShop.get(`/cart-apis/customer/shippings/${user.user_id}/`);
                if (result.data.length > 0) {
                    const shippingDetails = result.data[0];

                    this.setState({
                        shipping_id: shippingDetails.id,
                        shipping_contact_name: shippingDetails.shipping_contact_name,
                        shipping_street_address: shippingDetails.shipping_street_address,
                        shipping_city: shippingDetails.shipping_city,
                        shipping_state: shippingDetails.shipping_state,
                        shipping_zip_code: shippingDetails.shipping_zip_code
                    })
                }

                if (localStorage.getItem('cart') !== null) {
                    const cart = JSON.parse(localStorage.getItem('cart'));
                    this.setState({
                        cartItems: cart.cartItems,
                        total: parseFloat(cart.total),
                        subTotal: parseFloat(cart.total),
                        loaded: true
                    });
                } else {
                    this.setState({
                        loaded: true
                    });
                }
            } else {
                this.props.previousPathHand(this.props.location.pathname);
                this.props.history.push('/auth/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = unescape(dataURI.split(',')[1]);
        }
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    dataURLtoFile = (dataurl, filename) => {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    deleteCarthand = async (e) => {
        try {
            this.setState({
                deleting: true
            });

            let cart = {};
            let newTotal = 0;
            let newGrand = 0;

            cart.cartItems = [];
            cart.total = 0;

            const id = parseInt(e.target.getAttribute('data-id'));
            const order_id = parseInt(e.target.getAttribute('data-order-id'));
            const res = await bannerShop.delete('/cart-apis/orders/' + order_id);

            if (res && res.status === 204) {
                const cartItems = this.state.cartItems.filter((item) => item.id !== id);
                const finded = this.state.cartItems.filter((item) => item.id === id);

                newTotal = this.state.subTotal - finded[0].price;
                cart.total = newTotal;
                if (newTotal === 0) {
                    newGrand = 0;
                } else {
                    newGrand = this.state.total - finded[0].price;
                }

                this.setState({
                    cartItems: cartItems,
                    total: newGrand,
                    subTotal: newTotal
                });

                if (cartItems.length === 0) {
                    cart.total = 0;
                }
                cart.cartItems = cartItems;
                localStorage.setItem('cart', JSON.stringify(cart));
                this.props.cartHandle();
            }
        } catch (error) {
            console.log(error);
        }
    }

    onShippingSelect = (e) => {
        if (e.target.value === 'Delivery' || e.target.value === 'Shipping') {
            this.setState({
                shipping: e.target.value,
                shipForm: true
            })
        } else {
            this.setState({
                shipping: e.target.value,
                shipForm: false
            })
        }
    }

    jsonToFormData = (data) => {
        function buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;

                formData.append(parentKey, value);
            }
        }
        const formData = new FormData();

        buildFormData(formData, data);

        return formData;
    }

    getFormData = (formData, data, previousKey) => {
        if (data instanceof Object) {
            Object.keys(data).forEach(key => {
                const value = data[key];
                if (value instanceof Object && !Array.isArray(value)) {
                    return this.getFormData(formData, value, key);
                }
                if (previousKey) {
                    key = `${previousKey}[${key}]`;
                }
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        formData.append(`${key}[]`, val);
                    });
                } else {
                    formData.append(key, value);
                }
            });
        }
    }

    toFormData(obj, form, namespace) {
        let fd = form || new FormData();
        let formKey;

        for (let property in obj) {
            if (obj.hasOwnProperty(property) && obj[property]) {
                if (namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }

                if (obj[property] instanceof Date) {
                    fd.append(formKey, obj[property].toISOString());
                }
                else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                    this.toFormData(obj[property], fd, formKey);
                } else { // if it's a string or a File object
                    fd.append(formKey, obj[property]);
                }
            }
        }

        return fd;
    }

    contOrder = async () => {
        try {
            this.setState({
                orderLoad: true
            });

            const customerRes = localStorage.getItem('customer');
            const customer = JSON.parse(customerRes);
            const customer_id = customer.id;

            if (this.state.shipping !== 'No Shipment') {
                if (this.state.shipping_id) {
                    const shipRes = await bannerShop.patch(`/cart-apis/shippings/${this.state.shipping_id}/`, {
                        shipping_contact_name: this.state.shipping_contact_name,
                        shipping_street_address: this.state.shipping_street_address,
                        shipping_city: this.state.shipping_city,
                        shipping_state: this.state.shipping_state,
                        shipping_zip_code: this.state.shipping_zip_code,
                        customer: customer_id
                    });

                    const checkRes = await bannerShop.post(`/cart-apis/orders/checkout/`, {
                        customer: customer_id,
                        shipping: this.state.shipping
                    });

                    this.setState({
                        orderLoad: false,
                        completed: true,
                        orderNum: ''
                    });
                } else {
                    const shipCrt = await bannerShop.post(`/cart-apis/customer/shippings/${this.state.user.user_id}/`, {
                        shipping_contact_name: this.state.shipping_contact_name,
                        shipping_street_address: this.state.shipping_street_address,
                        shipping_city: this.state.shipping_city,
                        shipping_state: this.state.shipping_state,
                        shipping_zip_code: this.state.shipping_zip_code,
                        customer: customer_id
                    });

                    const checkRes = await bannerShop.post(`/cart-apis/orders/checkout/`, {
                        customer: customer_id,
                        shipping: this.state.shipping
                    });

                    this.setState({
                        orderLoad: false,
                        completed: true,
                        orderNum: ''
                    });
                }
            } else {
                const checkRes = await bannerShop.post(`/cart-apis/orders/checkout/`, {
                    customer: customer_id,
                    shipping: this.state.shipping
                });

                this.props.clearCart();
                this.setState({
                    orderLoad: false,
                    completed: true,
                    orderNum: ''
                });
            }
        } catch (error) {
            console.log(error);
        }
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
        // if (this.props.isLoggedIn) {
        // let orderBody = {
        //     customer: 1,
        //     customer_required_date: '2020-05-06',
        //     details: 'None',
        //     start_date: '2020-05-06',
        //     status: 'Yet To Start',
        //     order_productorders: []
        // };

        // this.state.cartItems.forEach(item => {
        //     const product = {
        //         product: item.id,
        //         custom_image: this.dataURLtoFile(item.file, 'custom_image'),
        //         // custom_image: null,
        //         special_note: item.special_note,
        //         total_price: item.price,
        //         total_weight: 5,
        //         product_units: 3,
        //         product_order_options: []
        //     }

        //     item.productOrderOptions.forEach(opt => {
        //         product.product_order_options.push({
        //             option: opt.id,
        //             sub_option: opt.sub,
        //             quantity: opt.qty,
        //             price: opt.price
        //         });
        //     });

        //     orderBody.order_productorders.push(product);
        // });

        // const oTFDOptions = {
        //     indices: false,
        //     nullsAsUndefineds: true,
        // };
        // const fd = this.toFormData(orderBody);

        // this.setState({
        //     orderLoad: true
        // });


        // axios.post('http://34.68.49.20:8001/api/orders/', fd, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        // }).then(res => {
        //     return res;
        // }).then(data => {
        //     const orderNum = data.data.order_number;
        //     localStorage.removeItem('cart');
        //     this.setState({
        //         orderLoad: false,
        //         completed: true,
        //         orderNum: orderNum
        //     });
        // })
        //     .catch(err => {
        //         console.log(err);
        //     });


        // bannerShop.post('/api/orders/', fd, {
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //   })
        //     .then(res => {
        //         return res;
        //     }).then(data => {
        //         const orderNum = data.data.order_number;
        //         localStorage.removeItem('cart');
        //         this.setState({
        //             orderLoad: false,
        //             completed: true,
        //             orderNum: orderNum
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // } else {
        //     this.props.previousPathHand(this.props.location.pathname);
        //     this.props.history.push('/auth/login');
        // }
    }

    render() {
        console.log(this.state);
        if (this.state.completed) {
            return (
                <section className="cart bgwhite p-t-70 p-b-100">
                    <div className="container">
                        <h1>Order is successfully Submited</h1>
                        <h4 style={{ marginTop: '10px', color: '#e65540' }}>An admin will contact you soon</h4>
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
                                                                    {this.state.deleting ? (
                                                                        <Loader type="TailSpin" color="#e65540" height={80} width={80} />
                                                                    ) : (
                                                                            <div className="cart-img-product b-rad-4 o-f-hidden" data-order-id={item.order_id} data-id={item.id} onClick={this.deleteCarthand}>
                                                                                <img src={item.imgURL} alt="IMG-PRODUCT" />
                                                                            </div>

                                                                        )}
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
                                    {/* <div className="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
                                        <div className="flex-w flex-m w-full-sm">
                                            <div className="size11 bo4 m-r-10">
                                                <input className="sizefull s-text7 p-l-22 p-r-22" type="text" name="coupon-code" placeholder="Coupon Code" />
                                            </div>
                                            <div className="size12 trans-0-4 m-t-10 m-b-10 m-r-10">
                                                <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">Apply coupon</button>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="d-flex" style={{ width: '100%' }}>
                                        <div className="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 p-lr-15-sm mr-1" style={{ flexGrow: '2' }}>
                                            <h5 className="m-text20 p-b-24">Shipping</h5>

                                            <div className="flex-w flex-sb bo10 p-t-15 p-b-20">
                                                <span className="s-text18 w-size19 w-full-sm">Shipping:</span>

                                                <div className="w-size20 w-full-sm">
                                                    <span className="s-text19">Select Shipping</span>

                                                    <div className="rs2-select2 rs3-select2 rs4-select2 bo4 of-hidden m-t-8 m-b-12">
                                                        <select className="selection-2" name="shipping"
                                                            style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}
                                                            value={this.state.shipping} onChange={this.onShippingSelect}
                                                        >
                                                            <option value='' disabled={true}>Select a Shipping...</option>
                                                            <option value='No Shipment'>No Shipment</option>
                                                            <option value='Delivery'>Delivery</option>
                                                            <option value='Shipping'>Shipping</option>
                                                        </select>
                                                    </div>

                                                    {this.state.shipForm ? (
                                                        <React.Fragment>
                                                            <div className="s-text15 mb-2">
                                                                Contact Name:
                                                            </div>
                                                            <div className="bo4 m-b-12" style={{ height: '40px' }}>
                                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text"
                                                                    value={this.state.shipping_contact_name}
                                                                    onChange={(e) => this.setState({ shipping_contact_name: e.target.value })}
                                                                    name="shipping_contact_name" placeholder="Contact Name" style={{ width: '100%' }} />
                                                            </div>

                                                            <div className="s-text15 mb-2">
                                                                Address:
                                                            </div>
                                                            <div className="bo4 m-b-12" style={{ height: '40px' }}>
                                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text"
                                                                    value={this.state.shipping_street_address}
                                                                    onChange={(e) => this.setState({ shipping_street_address: e.target.value })}
                                                                    name="shipping_street_address" placeholder="Street Address" style={{ width: '100%' }} />
                                                            </div>

                                                            <div className="s-text15 mb-2">
                                                                City:
                                                            </div>
                                                            <div className="bo4 m-b-12" style={{ height: '40px' }}>
                                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text"
                                                                    value={this.state.shipping_city}
                                                                    onChange={(e) => this.setState({ shipping_city: e.target.value })}
                                                                    name="shipping_city" placeholder="City" style={{ width: '100%' }} />
                                                            </div>

                                                            <div className="s-text15 mb-2">
                                                                State:
                                                            </div>
                                                            <div className="bo4 m-b-12" style={{ height: '40px' }}>
                                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text"
                                                                    value={this.state.shipping_state}
                                                                    onChange={(e) => this.setState({ shipping_state: e.target.value })}
                                                                    name="shipping_state" placeholder="State" style={{ width: '100%' }} />
                                                            </div>

                                                            <div className="s-text15 mb-2">
                                                                Zip Code:
                                                            </div>
                                                            <div className="bo4 m-b-12" style={{ height: '40px' }}>
                                                                <input className="sizefull s-text7 p-l-15 p-r-15" type="text"
                                                                    value={this.state.shipping_zip_code}
                                                                    onChange={(e) => this.setState({ shipping_zip_code: e.target.value })}
                                                                    name="shipping_zip_code" placeholder="Zip Code" style={{ width: '100%' }} />
                                                            </div>

                                                        </React.Fragment>
                                                    ) : ("")}
                                                </div>
                                            </div>

                                        </div>

                                        <div className="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 p-lr-15-sm" style={{ flexGrow: '1' }}>
                                            <h5 className="m-text20 p-b-24">Cart Totals</h5>

                                            <div className="flex-w flex-sb-m p-b-12">
                                                <span className="s-text18 w-size19 w-full-sm">Subtotal:</span>

                                                <span className="m-text21 w-size20 w-full-sm">${this.state.subTotal}</span>
                                            </div>

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

export default withRouter(Cart);