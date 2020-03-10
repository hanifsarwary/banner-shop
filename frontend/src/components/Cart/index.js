import React from 'react';

class Cart extends React.Component {
    state = {
        items: [
            { id: 1, name: 'Indoor Banner', imgUrl: '/images/labelsticker.jpg', total: 12, qty: 2 },
            { id: 2, name: 'Indoor Banner', imgUrl: '/images/labelsticker.jpg', total: 10, qty: 1 }
        ],
        subTotal: 0
    };


    render() {
        return <h1>Hello Cart</h1>
    }
}

export default Cart;