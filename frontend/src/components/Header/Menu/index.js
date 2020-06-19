import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import bannerShop from '../../../api/bannerShop';

class Menu extends React.Component {
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
            <div className="wrap_menu">
                <nav className="menu">
                    <ul className="main_menu">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {/* <li>
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                            }}>
                                Categories
                            </a>
                            <ul className="sub_menu">
                                {this.state.loaded ?
                                    this.state.categories.map(category => {
                                        return (
                                            <li key={category.id}>
                                                {(category.children_categories) ? (
                                                    <React.Fragment>
                                                        <Link to={`/category/${category.id}`}>
                                                            {category.name}
                                                        </Link>
                                                        <ul className="sub_menu">
                                                            {category.children_categories.map(subCat => {
                                                                return (
                                                                    <li key={subCat.id}>
                                                                        <Link to={`/category/${subCat.id}`}>
                                                                            {subCat.name}
                                                                        </Link>
                                                                        {subCat.products.length > 0 ? (
                                                                            <ul className="sub_menu">
                                                                                {subCat.products.map(product => {
                                                                                    return (<li key={product.id}>
                                                                                        <Link to={`/product/${product.id}`}>{product.product_name}</Link>
                                                                                    </li>)
                                                                                })}
                                                                            </ul>
                                                                        ) : ("")}
                                                                    </li>
                                                                )
                                                            })};
                                                        </ul>
                                                    </React.Fragment>
                                                ) : (
                                                        <React.Fragment>
                                                            <Link to={`/category/${category.id}`}>
                                                                {category.name}
                                                            </Link>
                                                            {category.products.length > 0 ? (
                                                                <ul className="sub_menu">
                                                                    {category.products.map(product => {
                                                                        return (<li key={product.id}>
                                                                            <Link to={`/product/${product.id}`}>{product.product_name}</Link>
                                                                        </li>)
                                                                    })}
                                                                </ul>
                                                            ) : ("")}
                                                        </React.Fragment>
                                                    )
                                                }
                                            </li>
                                        )
                                    }) : (
                                        <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                            <Loader type="ThreeDots" color="#e65540" height={40} width={40} />
                                        </div>
                                    )
                                }
                            </ul>
                        </li> */}

                        {this.state.loaded ?
                            this.state.categories.map(category => {
                                return (
                                    <li key={category.id}>
                                        <Link to={`/category/${category.id}`}>
                                            {category.name}
                                        </Link>
                                        {(category.children_categories) ? (
                                            <ul className="sub_menu">
                                                {category.children_categories.map(subCat => {
                                                    return (
                                                        <li key={subCat.id}>
                                                            <Link to={`/category/${subCat.id}`}>
                                                                {subCat.name}
                                                            </Link>
                                                            {subCat.products.length > 0 ? (
                                                                <ul className="sub_menu">
                                                                    {subCat.products.map(product => {
                                                                        return (<li key={product.id}>
                                                                            <Link to={`/product/${product.id}`}>{product.product_name}</Link>
                                                                        </li>)
                                                                    })}
                                                                </ul>
                                                            ) : ("")}
                                                        </li>
                                                    )
                                                }
                                                )}
                                            </ul>
                                        ) : (
                                                <React.Fragment>
                                                    {category.products.length > 0 ? (
                                                        <ul className="sub_menu">
                                                            {category.products.map(product => {
                                                                return (
                                                                    <li key={product.id}>
                                                                        <Link to={`/product/${product.id}`}>{product.product_name}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    ) : ("")}
                                                </React.Fragment>
                                            )}
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
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/custom-quote">Custom Quote</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Menu;