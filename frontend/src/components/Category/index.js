import React from 'react';
import CategorySideBar from './CategorySideBar'
import CategoryProducts from './CategoryProducts'

class Category extends React.Component {
    state = {
        categoryName: 'Banner',
        categoryItems: [
            { 
                id: 1, 
                name: 'standard roll up banner',
                price: '118.00', 
                imgURL: '/images/R002.jpg',
                features: ['Size: 23.5" X 72"', 'Included Carrying Bags', '6-Month Hardware Warranty', 'Lightweight & Portable']
            },
            { 
                id: 2,
                name: 'economy roll up banner', 
                price: '128.00', 
                imgURL: '/images/R001-1.jpg',
                features: ['Size: 33.5" X 80"', 'Included Carrying Bags', '6-Month Hardware Warranty', 'Lightweight & Portable']
            },
            { 
                id: 3,
                name: 'delux roll up banner', 
                price: '288.00', 
                imgURL: '/images/Deluxe-Retractable.jpg',
                features: ['Size: 33.5" X 80"', 'Included Carrying Bags', 'Sleek Attractive Hardware', 'Double-sided Display']
            },
            { 
                id: 4,
                name: 'tension fabric stand', 
                price: '198.00', 
                imgURL: '/images/Tension-Fabric-Stand.jpg',
                features: ['Size: 36" X 90" , 48" X 90"', 'Tool-free installation', 'EZ setup tube hardware', 'Great POP display']
            }
        ]
    }

    render() {
        return (
            <React.Fragment>
                <section className="bg-title-page p-t-50 p-b-40 flex-col-c-m category-intro">
                    <h2 className="l-text2 t-center">
                        BANNERS PRINTING
                    </h2>
                    <p className="m-text13 t-center" style={{ fontSize: '15px', marginTop: '20px' }}>
                        BannerShopusa.com has provided full color banner signs using our vinyl banner printing technology for all types of different customers all across the country. Whether you need a trade show banner, a banner for inside your business, or a banner sturdy enough to be displayed outside of your store, BannerShopusa.com offers high-resolution, high-quality banners in full color and for a much lower price than your local sign or print shop. Make a strong impact and make sure that your message is getting across to your target audience.
                    </p>
                </section>
                <section className="bgwhite p-t-55 p-b-65">
                    <div className="container">
                        <div className="row">
                            <CategorySideBar />
                            <CategoryProducts items={this.state.categoryItems}/>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }

}

export default Category;