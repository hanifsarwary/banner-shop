import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import bannerShop from '../../api/bannerShop';

class Footer extends React.Component {
    state = {
        loaded: false,
        categories: []
    };

    async componentDidMount() {
        bannerShop.get('/api/category-subcategory-products')
            .then(res => {
                this.setState({ categories: res.data.results, loaded: true });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <footer className="bg6 p-t-45 p-b-43 p-l-45 p-r-45">
                <div className="flex-w p-b-90">
                    <div className="w-size6 p-t-30 p-l-15 p-r-15 respon3">
                        <h4 className="s-text12 p-b-30">location</h4>
                        <div>
                            <p className="s-text7 w-size27">

                            </p>
                            <div className="flex-m p-t-30">
                                <a href="/" className="fs-18 color1 p-r-20 fa fa-facebook">

                                </a>
                                <a href="/" className="fs-18 color1 p-r-20 fa fa-instagram">

                                </a>
                                <a href="/" className="fs-18 color1 p-r-20 fa fa-pinterest-p">

                                </a>
                                <a href="/" className="fs-18 color1 p-r-20 fa fa-snapchat-ghost">

                                </a>
                                <a href="/" className="fs-18 color1 p-r-20 fa fa-youtube-play">

                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
                        <h4 className="s-text12 p-b-30">
                            Categories
                        </h4>
                        <ul>
                            {this.state.loaded ? this.state.categories.map(category => {
                                return (
                                    <li className="p-b-9">
                                        <Link to={`/category/${category.id}`} className="s-text7">
                                            {category.name}
                                        </Link>
                                    </li>
                                )
                            }) : (
                                    <li>
                                        <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                            <Loader type="ThreeDots" color="#e65540" height={40} width={40} />
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
                        <h4 className="s-text12 p-b-30">
                            Links
                        </h4>
                        <ul>
                            {/* <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    Search
                                </a>
                            </li> */}
                            <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    About Us
                                </a>
                            </li>
                            <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    Contact Us
                                </a>
                            </li>
                            {/* <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    Returns
                                </a>
                            </li> */}
                        </ul>
                    </div>

                    {/* <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
                        <h4 className="s-text12 p-b-30">
                            Help
                        </h4>
                        <ul>
                            <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    Track Order
                                </a>
                            </li>
                            <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    Returns
                                </a>
                            </li>
    
                            <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    Shipping
                                </a>
                            </li>
                            <li className="p-b-9">
                                <a href="/" className="s-text7">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div> */}

                    <div className="w-size8 p-t-30 p-l-15 p-r-15 respon3">
                        <h4 className="s-text12 p-b-30">
                            PHONE
                        </h4>
                        <p className="s-text7 w-size27">
                            {/* Tel: (415)682-7777 <br />
                        Fax: (415)682-5577 */}
                        </p>

                    </div>
                </div>

                <div className="t-center p-l-15 p-r-15">
                    <div className="t-center s-text8 p-t-20">
                        Copyright © 2020 All rights reserved by 4colorclub
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;