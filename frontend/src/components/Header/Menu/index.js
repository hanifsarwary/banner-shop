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
        try {
            let newCat = [];
            const res = await bannerShop.get('/api/categories');
            const categories = res.data.results;

            for (let index = 0; index < categories.length; index++) {
                await new Promise(async (next) => {
                    const category = categories[index];
                    if (category.have_sub_categories) {
                        const subRes = await bannerShop.get(`/api/categories/${category.id}/sub-categories/`);

                        const catProdRes = await bannerShop.get(`/api/products/category/${category.id}/`);
                        const sub = subRes.data;
                        const subCategories = [];

                        for (let index = 0; index < sub.length; index++) {
                            const subCategory = sub[index];
                            await new Promise(async (next) => {
                                const subProdRes = await bannerShop.get(`/api/products/category/${subCategory.id}/`);
                                let products = [];

                                if (subProdRes) {
                                    products = subProdRes.data;
                                }

                                subCategories.push({
                                    ...subCategory,
                                    products
                                });
                                next();
                            });
                        }

                        newCat.push({
                            ...category,
                            products: [],
                            sub: subCategories
                        })
                        if (index === categories.length - 1) {
                            this.setState({
                                categories: newCat,
                                loaded: true
                            });
                        }
                    } else {
                        const catProdRes = await bannerShop.get(`/api/products/category/${category.id}/`);
                        let products = [];

                        if (catProdRes) {
                            products = catProdRes.data;
                        }

                        newCat.push({
                            ...category,
                            products: products,
                            sub: []
                        })

                        if (index === categories.length - 1) {
                            this.setState({
                                categories: newCat,
                                loaded: true
                            });
                        }
                    }
                    next();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div className="wrap_menu">
                <nav className="menu">
                    <ul className="main_menu">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                            }}>
                                Categories
                            </a>
                            <ul className="sub_menu">
                                {console.log(this.state.categories)}
                                {this.state.loaded ?
                                    this.state.categories.map(category => {
                                        return (
                                            <li key={category.id}>
                                                {(category.have_sub_categories && category.sub.length > 0) ? (
                                                    <React.Fragment>
                                                        <a href="/" onClick={(e) => {
                                                            e.preventDefault();
                                                        }}>
                                                            {category.name}
                                                        </a>
                                                        <ul className="sub_menu">
                                                            {category.sub.map(subCat => {
                                                                return (
                                                                    <li key={subCat.id}>
                                                                        {/* <Link to="/">{subCat.name}</Link> */}
                                                                        <a href="/" onClick={(e) => {
                                                                            e.preventDefault();
                                                                        }}>
                                                                            {subCat.name}
                                                                        </a>
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
                                                            })}
                                                        </ul>
                                                    </React.Fragment>
                                                ) : (
                                                        <React.Fragment>
                                                            <a href="/" onClick={(e) => {
                                                                e.preventDefault();
                                                            }}>
                                                                {category.name}
                                                            </a>
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
                                                        // <Link to={`/category/${category.id}`}>{category.name}</Link>
                                                    )}
                                            </li>
                                        )
                                    })
                                    : (
                                        <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                            <Loader type="ThreeDots" color="#e65540" height={40} width={40} />
                                        </div>
                                    )
                                }
                            </ul>
                        </li>
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