import React from 'react';

class CustomQuote extends React.Component {
    state = {
        additional_requirements: '',
        company_name: '',
        contact_name: '',
        custom_image: null,
        email: '',
        fax_no: '',
        finish_size: '',
        ink_desc: '',
        job_type: '',
        job_desc: '',
        media_desc: '',
        old_job_reference: '',
        phone_no: '',
        quantity: null,
        required_ship_date: null,
        is_proof: false
    }

    formChange = (e) => {

    }

    render() {
        return (
            <React.Fragment>
                <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m category-intro">
                    <h2 className="l-text2 t-center">Custom Quote</h2>
                </section>
                <section className="bgwhite p-t-66 p-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 p-b-30">
                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="company_name" placeholder="Company Name"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="company_name" placeholder="Contact Name"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="company_name" placeholder="Phone Number"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="company_name" placeholder="2nd Phone Number/Fax Number"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="company_name" placeholder="Email Address"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="company_name" placeholder="Job Type"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                                    name="message" placeholder="Additional Requirements Not Listed Above"
                                    // value={this.state.message}
                                    onChange={this.formChange}></textarea>

                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="date"
                                        name="company_name" placeholder="Request Ship Date"
                                        // value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>
                            </div>
                            <div className="col-md-6 p-b-30">
                                {this.state.required ? (
                                    <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                ) : ('')}
                                <div className="bo4 of-hidden size15 m-b-20">
                                    <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                        name="approach_details" placeholder="How did you hear about us?"
                                        value={this.state.approach_details}
                                        onChange={this.formChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default CustomQuote;