import React from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import bannerShop from '../../api/bannerShop';

class ProductDetail extends React.Component {
  state = {
    loaded: false,
    detail: {},
    total: 0,
    cartAdd: false,
    valid: true,
    required: false,
    addDesc: '',
    file: {},
    priceCalc: {},
    optionState: {},
    quantity: {},
    optDet: [],
    options: [],
    priceLoad: false
  }

  loadDataOfPrice = async (id) => {
    try {
      const productsResponse = await bannerShop.get(`/api/products/${id}`);
      const productsData = productsResponse.data;
      const options = productsData.option_set;

      this.setState({
        detail: productsData,
        total: productsData.one_unit_weight,
        cartAdd: false,
        valid: true,
        required: false,
        addDesc: '',
        file: {},
        priceCalc: {},
        optionState: {},
        quantity: {},
        optDet: [],
        options: [],
        priceLoad: false
      });

      const priceCalcObj = {
        product_id: id,
        product_name: productsData.product_name,
        options: {}
      };
      const new_options = [];
      let newTotal = 0;
      const optionState = {};
      let quantity = {};
      const optDet = [];

      for (let index = 0; index < options.length; index++) {
        await new Promise(async (next) => {
          const option = options[index];
          if (option.is_suboptions && option.suboption_set.length > 0) {
            const subOption = option.suboption_set[0];

            priceCalcObj.options[option.option_name] = [subOption.name, subOption.price];
            optionState[option.option_name] = {};
            optionState[option.option_name].id = subOption.id;
            optionState[option.option_name].name = subOption.name;

            optDet.push({
              id: option.id,
              sub: subOption.id,
              qty: 1,
              price: subOption.price
            });

            if (option.option_name === 'Quantity') {
              quantity = {
                ...option,
                sub: {
                  optionId: option.id,
                  subOptions: option.suboption_set
                }
              };
            } else {
              new_options.push({
                ...option,
                sub: {
                  optionId: option.id,
                  subOptions: option.suboption_set
                }
              })
            }

            if (index === options.length - 1) {
              const price = await bannerShop.post('/api/prices/', priceCalcObj);
              const priceData = await price;

              newTotal = priceData.data.price;

              this.setState({
                total: newTotal,
                priceCalc: priceCalcObj,
                optionState: optionState,
                quantity: quantity,
                optDet: optDet,
                loaded: true
              })
            }
          } else {
            priceCalcObj.options[option.option_name] = 1;
            optionState[option.option_name] = 1;
            // {
            //   option: opt.id,
            //   sub_option: opt.sub,
            //   quantity: opt.qty,
            //   price: opt.price
            // }
            optDet.push({
              id: option.id,
              sub: null,
              qty: 1,
              price: option.price_unit
            });

            if (option.option_name === 'Quantity') {
              quantity = { ...option };
            } else {
              new_options.push({
                ...option,
                sub: {
                  optionId: option.id,
                  subOptions: []
                }
              })
            }

            if (index === options.length - 1) {
              const price = await bannerShop.post('/api/prices/', priceCalcObj);
              const priceData = await price;

              newTotal = priceData.data.price;

              this.setState({
                total: newTotal,
                priceCalc: priceCalcObj,
                optionState: optionState,
                quantity: quantity,
                optDet: optDet,
                loaded: true
              })
            }
          }
          next();
        });
      }

      this.setState({
        options: new_options,
      });
    } catch (error) {
      console.log(error);
      if(!error.response) {
        this.props.errorMount('Unable to connect to server');
			} else if(error.response.status === 500) {
				this.props.errorMount('Internal Server Error');
      }
    }
  }

  async componentDidMount() {
    try {
      const id = parseInt(this.props.match.params.id);
      await this.loadDataOfPrice(id);
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate() {
    if (this.state.loaded && this.state.cartAdd) {
      window.setTimeout(() => {
        this.setState({
          cartAdd: false
        });
      }, 3000);
    }

  }

  async componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.match.params.id !== this.props.match.params.id) {
        this.setState({
          loaded: false
        });
        const id = nextProps.match.params.id;

        await this.loadDataOfPrice(id);
        // this.setState({
        //   loaded: true
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeHand = (e) => {
    const value = parseInt(e.target.value);
    const name = e.target.getAttribute('data-name');
    const optionState = { ...this.state.optionState };

    if (value <= 0) {
      this.setState({
        optionState: optionState,
      })
    } else {
      optionState[name] = value;
      this.setState({
        optionState: optionState,
      })
    }
  }

  subOptionPricer = (e) => {
    this.setState({
      priceLoad: true,
      total: 0
    });

    let optDet = [];
    const name = e.target[e.target.selectedIndex].getAttribute('data-name');
    const sub = e.target[e.target.selectedIndex].getAttribute('data-sub');
    const price = parseFloat(e.target[e.target.selectedIndex].getAttribute('data-price'));
    const id = parseInt(e.target[e.target.selectedIndex].getAttribute('data-id'));
    const optId = parseInt(e.target[e.target.selectedIndex].getAttribute('data-opt-id'));

    const optDetObj = this.state.optDet.find(opt => opt.id === optId);
    optDet = this.state.optDet.filter(opt => opt.id !== optId);

    optDetObj.sub = id;
    optDet.push(optDetObj);

    const priceCalcObj = { ...this.state.priceCalc };
    const optionState = { ...this.state.optionState };
    priceCalcObj.options[name] = [sub, price];
    optionState[name].id = id;
    optionState[name].name = sub;

    bannerShop.post('/api/prices/', priceCalcObj)
      .then(data => {
        return data;
      })
      .then(res => {
        const newTotal = res.data.price;
        this.setState({
          total: newTotal,
          priceCalc: priceCalcObj,
          optionState: optionState,
          optDet: optDet,
          priceLoad: false,
        })
      }).catch(err => {
        console.log(err);
      })
  }

  optionChangeCalc = (e) => {
    this.setState({
      priceLoad: true,
      total: 0
    });

    let optDet = [];
    const name = e.target.getAttribute('data-name');
    const id = parseInt(e.target.getAttribute('data-id'));
    const value = parseInt(e.target.value);

    const optDetObj = this.state.optDet.find(opt => opt.id === id);
    optDet = this.state.optDet.filter(opt => opt.id !== id);

    optDetObj.qty = value;
    optDet.push(optDetObj);

    const priceCalcObj = { ...this.state.priceCalc };
    const optionState = { ...this.state.optionState };

    if (name === "quantity") {
      priceCalcObj[name] = value;
    } else {
      priceCalcObj.options[name] = value;
    }

    optionState[name] = value;

    bannerShop.post('/api/prices/', priceCalcObj)
      .then(data => {
        return data;
      })
      .then(res => {
        const newTotal = res.data.price
        this.setState({
          total: newTotal,
          priceCalc: priceCalcObj,
          optionState: optionState,
          optDet: optDet,
          priceLoad: false,
        })
      }).catch(err => {
        console.log(err);
      })
  }

  onEnterChange = (e) => {
    if (e.keyCode === 13) {
      this.optionChangeCalc(e);
    }
  }

  addDescHand = (e) => {
    this.setState({
      addDesc: e.target.value,
      required: false,
      valid: true
    });
  }

  fileHand = (e) => {
    this.setState({
      file: e.target.files[0]
    });
  }

  cartAddhandler = () => {
    if (this.state.addDesc === '') {
      this.setState({
        required: true,
        valid: false
      });
    } else {
      let cart;

      const item = {
        id: this.state.detail.id,
        name: this.state.detail.product_name,
        imgURL: this.state.detail.default_product_image,
        price: this.state.total,
        qty: this.state.qty,
        special_note: this.state.addDesc
      }

      item.productOrderOptions = this.state.optDet;

      if (localStorage.getItem('cart') === null) {
        cart = {};
        cart.cartItems = [];
        cart.total = 0;
      } else {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      this.getBase64(this.state.file)
        .then(base64 => {
          item.file = base64;

          cart.cartItems.push(item);
          cart.total = cart.total + this.state.total;
          localStorage.setItem('cart', JSON.stringify(cart));

          this.setState({
            cartAdd: true
          });
        })
        .catch(err => {
          console.log(err);
        });

    }
  }

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  render() {
    console.log(this.state);

    if (this.state.loaded) {
      return (
        <div className="container bgwhite p-t-35 p-b-80">
          <span className="floating-price m-text17" style={{ display: 'flex' }}>
            {this.state.priceLoad ? (
              <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: '10px' }}>
                <Loader type="TailSpin" color="#fff" height={20} width={20} />
              </div>
            ) : (
                ""
              )}
            Price:
            ${this.state.total}
          </span>
          <div className="flex-w flex-sb">
            <div className="w-size13 p-t-30 respon5">
              <div className="wrap-slick3 flex-sb flex-w">
                <img src={this.state.detail.default_product_image} alt="IMG-PRODUCT" style={{ width: '100%', height: 'auto' }} />
              </div>
            </div>
            <div className="w-size14 p-t-30 respon5">
              <h4 className="product-detail-name m-text16 p-b-13">
                {this.state.detail.product_name}
              </h4>
              <span className="m-text17" style={{ display: 'flex' }}>
                {this.state.priceLoad ? (
                  <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <Loader type="TailSpin" color="#000" height={20} width={20} />
                  </div>
                ) : (
                    ""
                  )}
                ${this.state.total}
              </span>

              <div className="p-b-15" style={{ marginTop: '10px' }}>

              </div>

              <div className="">
                <div className="flex-m flex-w">
                  <div className="s-text15 mb-2">
                    Quantity:
                  </div>
                  {(this.state.quantity.is_suboptions && this.state.quantity.suboption_set.length > 0) ? (
                    <div className="bo4 of-hidden size15 m-b-20">
                      <select className="selection-2" name="size"
                        style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}
                        onChange={this.subOptionPricer} value={this.state.optionState[this.state.quantity.option_name].id}
                      >
                        {this.state.quantity.sub.subOptions.map(subOption => {
                          return (
                            <option key={subOption.id} value={subOption.id}
                              data-name={this.state.quantity.option_name} data-price={subOption.price} data-sub={subOption.name}
                              data-id={subOption.id} data-opt-id={this.state.quantity.id}
                            >
                              {subOption.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  ) : (
                      <div className="bo4 of-hidden size15 m-b-20">
                        <input className="sizefull s-text7 p-l-22 p-r-22" type="number"
                          value={this.state.optionState["Quantity"]} data-name="Quantity" data-id={this.state.quantity.id}
                          onBlur={this.optionChangeCalc} onChange={this.changeHand} onKeyDown={this.onEnterChange}
                        />
                      </div>
                    )}
                </div>
                {this.state.options.map((option) => {
                  console.log('option', option);
                  console.log('option.option_name', option.option_name);
                  console.log('obj', this.state.optionState[option.option_name]);
                  let value = this.state.optionState[option.option_name].id;
                  return (
                    <div className="flex-m flex-w" key={option.id}>
                      <div className="s-text15 mb-2">
                        {option.option_name}:
                      </div>
                      <div className="bo4 of-hidden size15 m-b-20">
                        {(option.is_suboptions && option.suboption_set.length > 0) ? (
                          <select className="selection-2" name="size"
                            style={{ width: '100%', height: '100%', border: 'none', padding: '10px' }}
                            onChange={this.subOptionPricer} value={value}
                          >
                            {option.sub.subOptions.map(subOption => {
                              return (
                                <option key={subOption.id} value={subOption.id}
                                  data-name={option.option_name} data-price={subOption.price} data-sub={subOption.name}
                                  data-id={subOption.id} data-opt-id={option.id}
                                >
                                  {subOption.name}
                                </option>
                              )
                            })}
                          </select>

                        ) : (
                            <input className="sizefull s-text7 p-l-22 p-r-22" type="number"
                              value={this.state.optionState[option.option_name]} data-name={option.option_name} data-id={option.id}
                              onBlur={this.optionChangeCalc} onChange={this.changeHand} onKeyDown={this.onEnterChange}
                            />
                          )}
                      </div>
                    </div>
                  )
                })}
                <div className="flex-m flex-w p-b-10 mt-3">
                  <div className="s-text15 mb-2">
                    Additional Instructions:
                            </div>
                  {this.state.required ? (
                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                  ) : ('')}
                  <textarea
                    className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                    name="message"
                    value={this.state.addDesc}
                    onChange={this.addDescHand}
                  ></textarea>
                </div>

                <div className="flex-m flex-w p-b-10 mt-3">
                  <div className="s-text15 mb-2">
                    File:
                            </div>
                  {this.state.required ? (
                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                  ) : ('')}
                  <div className="bo4 of-hidden size15 m-b-20">
                    <input className="sizefull s-text7" type="file"
                      style={{ padding: '10px' }}
                      onChange={this.fileHand}
                    />
                  </div>
                </div>

                <div className="flex-r-m flex-w p-t-10 p-b-40">
                  {this.state.cartAdd ? (
                    <span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>Product added to cart</span>
                  ) : (
                      ""
                    )}

                  {!this.state.valid ? (
                    <span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>* These fields are required</span>
                  ) : (
                      ""
                    )}
                  <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                    <button
                      className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4"
                      onClick={this.cartAddhandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* <div className="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
                            <h5 className="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                                Description
                                <i className="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                                <i className="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                            </h5>

                            <div className="dropdown-content dis-none p-t-15 p-b-23">
                                <p className="s-text8">
                                    Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                                </p>
                            </div>
                        </div> */}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container bgwhite p-t-35 p-b-80">
          <div className="container">
            <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
              <Loader type="TailSpin" color="#e65540" height={80} width={80} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(ProductDetail);