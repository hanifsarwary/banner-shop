import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import bannerShop from '../../api/bannerShop';
import Loader from 'react-loader-spinner';

class Contact extends React.Component {
  state = {
    approach_details: '',
    message: '',
    customer: 0,
    valid: true,
    submited: false,
    required: false
  };

  componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);

      if (user) {
        this.setState({
          customer: user.user_id
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  formChange = (e) => {
    const { name, value } = e.target;
    const form = {};
    form[name] = value;
    this.setState(form);
  };

  formSubmit = async (e) => {
    try {
      e.preventDefault();
      if (this.state.approach_details === '' || this.state.message === '') {
        this.setState({
          valid: false,
          required: true
        });
      } else {
        if (this.props.isLoggedIn) {
          this.setState({
            submited: true,
          });


          const formData = {
            approach_details: this.state.approach_details,
            message: this.state.message,
            customer: this.state.customer
          };

          const res = await bannerShop.post('/api/contact-requests/', formData);

          this.setState({
            submited: false,
            approach_details: '',
            message: '',
          });

        } else {
          this.props.previousPathHand(this.props.location.pathname);
          this.props.history.push('/auth/login');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m category-intro">
          <h2 className="l-text2 t-center">
            Contact Us
          </h2>
        </section>
        <section className="bgwhite p-t-66 p-b-60">
          <div className="container">
            <div className="row">
              <div className="col-md-6 p-b-30">
                
                <img src="/images/undraw_contact_us.png" alt="IMG-ABOUT" style={{ width: '100%', height: 'auto' }}/>
                
              </div>

              <div className="col-md-6 p-b-30">
                <form className="leave-comment" onSubmit={this.formSubmit}>
                  <h4 className="m-text26 p-b-36 p-t-15">Send us your message</h4>

                  {/* <div className="bo4 of-hidden size15 m-b-20">
                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                      name="name" placeholder="Full Name" />
                  </div> */}

                  {/* <div className="bo4 of-hidden size15 m-b-20">
                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                      name="phone-number" placeholder="Phone Number" />
                  </div> */}

                  {/* <div className="bo4 of-hidden size15 m-b-20">
                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                      name="email" placeholder="Email Address" />
                  </div> */}

                  {this.state.required ? (
                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                  ) : ('')}
                  <div className="bo4 of-hidden size15 m-b-20">
                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                      name="approach_details" placeholder="How did you hear about us?"
                      value={this.state.approach_details} 
                      onChange={this.formChange} />
                  </div>

                  {this.state.required ? (
                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                  ) : ('')}
                  <textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                    name="message" placeholder="Message" 
                    value={this.state.message}
                    onChange={this.formChange}></textarea>

                  <div className="m-b-5" style={{ width: '100%' }}>
                    {!this.state.valid ? (
                      <span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>* These fields are required</span>
                    ) : (
                        ""
                      )}
                  </div>

                  <div className="w-size25">
                    <button className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                      {this.state.submited ? (
                        <div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: '10px' }}>
                          <Loader type="TailSpin" color="#fff" height={20} width={20} />
                        </div>
                      ) : (
                          ""
                        )}
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(Contact);