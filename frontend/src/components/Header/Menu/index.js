import React from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import bannerShop from '../../../api/bannerShop';

class Menu extends React.Component {
    state = {
        loaded: false,
        categories: []
    };

    componentDidMount() {
        bannerShop.get('/api/categories')
        .then((res) => {
            this.setState({
                categories: res.data.results,
                loaded: true
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    render() {
        return (
            <div className="wrap_menu">
                <nav className="menu">
                    <ul className="main_menu">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/category/banner">Banner</Link>
                        </li>
                        <li>
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                            }}>
                                Categories
                            </a>
                            <ul className="sub_menu">
                            {this.state.loaded ? 
                                this.state.categories.map(category => {
                                    return(
                                        <li key={category.id}>
                                            <Link to={`/category/${category.id}`}>{category.name}</Link>
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
                            <Link to="/">Poster</Link>
                        </li>
                        <li>
                            <Link to="/">Stickers</Link>
                        </li>
                        <li>
                            <Link to="/">Signs</Link>
                        </li>
                        <li>
                            <Link to="/">Photo Printing</Link>
                        </li>
                        <li>
                            <Link to="/">Digital Printing</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Menu;