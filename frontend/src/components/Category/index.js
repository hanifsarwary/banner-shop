import React from 'react';
import { withRouter } from 'react-router-dom';
import bannerShop from '../../api/bannerShop';
import CategorySideBar from './CategorySideBar'
import CategoryProducts from './CategoryProducts'

class Category extends React.Component {
    state = {
        categoryName: 'Banner',
        categoryItems: [],
        loaded: false
    }

    async componentDidMount() {
        const id = this.props.match.params.id;

        await this.loadData(id);
    }

    loadData = async (id) => {
        try {
            const res = await bannerShop.get(`/api/products/category/${id}`)

            if (res.status === 200) {
                console.log(res);
                this.setState({
                    categoryItems: res.data.length > 0 ? res.data : [],
                    loaded: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async componentWillReceiveProps(nextProps) {
        try {
            if (nextProps.match.params.id !== this.props.match.params.id) {
                this.setState({
                    loaded: false
                });
                const id = nextProps.match.params.id;

                await this.loadData(id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <React.Fragment>
                <section className="bg-title-page p-t-50 p-b-40 flex-col-c-m category-intro">
                    <h2 className="l-text2 t-center">
                        BANNERS PRINTING
                    </h2>
                    {/* <p className="m-text13 t-center" style={{ fontSize: '15px', marginTop: '20px' }}>
                        BannerShopusa.com has provided full color banner signs using our vinyl banner printing technology for all types of different customers all across the country. Whether you need a trade show banner, a banner for inside your business, or a banner sturdy enough to be displayed outside of your store, BannerShopusa.com offers high-resolution, high-quality banners in full color and for a much lower price than your local sign or print shop. Make a strong impact and make sure that your message is getting across to your target audience.
                    </p> */}
                </section>
                <section className="bgwhite p-t-55 p-b-65">
                    <div className="container">
                        <div className="row">
                            {/* <CategorySideBar /> */}
                            <CategoryProducts items={this.state.categoryItems} loaded={this.state.loaded} />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }

}

export default withRouter(Category);