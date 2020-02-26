import React, { Component } from 'react';

class Footer extends Component {
    state = {
        featureProducts: [
            { name: 'banners', img: '/images/sb003.jpg' },
            { name: 'posters', img: '/images/BACKMOUNTPOSTER.jpg' },
            { name: 'label stickers', img: '/images/labelsticker.jpg' },
            { name: 'arcylic photo', img: '/images/acrylicboard.jpg' },
            { name: 'double-sided posters', img: '/images/D-SIDEDPOSTER.jpg' },
            { name: 'canvas wall sticker', img: '/images/vinylwall.jpg' },
            { name: 'vehicle wrap sticker', img: '/images/VehicleSticker.jpg' },
            { name: 'vinyl lettering', img: '/images/LETTERINGsticker.jpg' },
            { name: 'woodenFrame poster', img: '/images/WOODENPOSTER.jpg' }
        ]
    }

    render() {
        return (
            <section className="newproduct bgwhite p-t-45 p-b-10">
                <div className="container">
                    <div className="sec-title p-b-60">
                        <h3 className="m-text5 t-center heading">
                            Featured Products
				    </h3>
                    </div>
                    <div className="row">
                        {this.state.featureProducts.map((product) => {
                            return (
                                <div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto" key={product.name}>
                                    <div className="block1 hov-img-zoom pos-relative m-b-30" style={{ backgroundColor: '#000' }}>
                                        <img src={product.img} alt="IMG-BENNER" style={{ opacity: '0.8' }} />

                                        <div className="block1-wrapbtn" style={{ width: '80%' }}>
                                            <a href="#" className="flex-c-m m-text2 bg3 hov1 trans-0-4" style={{ padding: '8px' }}>
                                                {product.name}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

export default Footer;




