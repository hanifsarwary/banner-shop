import React from 'react';
import bannerShop from '../../api/bannerShop';
import Loader from 'react-loader-spinner';

class Footer extends React.Component {
    state = {
        featureProducts: [],
        loaded: false
    }

    componentDidMount() {
        bannerShop.get('/api/products/?is_featured=True')
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        featureProducts: res.data.results,
                        loaded: true
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        if (this.state.loaded) {
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
                                    <div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto" key={product.id}>
                                        <div className="block1 hov-img-zoom pos-relative m-b-30" style={{ backgroundColor: '#000' }}>
                                            <img src={product.default_product_image} alt="IMG-BENNER" style={{ opacity: '0.8' }} />

                                            <div className="block1-wrapbtn" style={{ width: '80%' }}>
                                                <a href={`/product/${product.id}`} className="flex-c-m m-text2 bg3 hov1 trans-0-4" style={{ padding: '8px' }}>
                                                    {product.product_name}
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
        } else {
            return (
                <section className="newproduct bgwhite p-t-45 p-b-10">
                    <div className="container">
                        <div className="sec-title p-b-60">
                            <h3 className="m-text5 t-center heading">
                                Featured Products
                            </h3>
                        </div>
                        <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                            <Loader type="TailSpin" color="#e65540" height={80} width={80} />
                        </div>
                    </div>
                </section>
            );
        }
    }
}

export default Footer;




