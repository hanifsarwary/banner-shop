import React from 'react';
import bannerShop from '../../api/bannerShop';
import Loader from 'react-loader-spinner';

class CustomQuote extends React.Component {
    state = {
        form: {
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
            is_proof: false,
        },
        required: false,
        submited: false
    }

    formChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const form = { ...this.state.form };
        form[name] = value;
        this.setState({
            form: form
        });
    }

    fileHand = (e) => {
        const form = { ...this.state.form };
        form.custom_image = e.target.files[0]
        this.setState({
            form: form
        });
    }

    formSubmit = async () => {
        try {
            this.setState({
                submited: true
            });
            const formData = new FormData();
            const form = { ...this.state.form };
            for (let key in form) {
                formData.append(key, form[key]);
            }
            console.log(this.state);
            await bannerShop.post('/api/custom-quotes/', formData);
            this.setState({
                submited: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <React.Fragment>
                <section className="bg-title-page p-t-40 p-b-50 flex-col-c-m category-intro">
                    <h2 className="l-text2 t-center">Custom Quote</h2>
                </section>
                <section className="bgwhite p-t-66 p-b-60">
                    <div className="container">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-6 p-b-30">
                                    <div className="s-text15 mb-2">
                                        Company Name:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="company_name"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Contact Name:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="company_name"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Phone Number:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="company_name"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        2nd Phone Number/Fax Number:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="company_name"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Email Address:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="company_name"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Job Type:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-1"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-1">Offset Printing</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-2"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-2">Grand Format</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-3"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-3">Digital Printing</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-4"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-4">Diecut &amp; Gluing Only</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-5"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-5">Folding Stitching</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-6"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-6">Flood UV</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-7"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-7">Drill Hole</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-8"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-8">Shrink Wrap</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-9"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-9">Mailing Service</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="checkbox"
                                            name="job_type"
                                            // value={this.state.approach_details}
                                            id="job_type-10"
                                            onChange={this.formChange} />
                                        <label htmlFor="job_type-10">Split Shipping</label>
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Additional Requirements Not Listed Above:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                                        name="message"
                                        // value={this.state.message}
                                        onChange={this.formChange}></textarea>

                                    <div className="s-text15 mb-2">
                                        Request Ship Date:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="date"
                                            name="company_name"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>
                                </div>
                                <div className="col-md-6 p-b-30">
                                    <div className="s-text15 mb-2">
                                        Job Description:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                                        name="job_desc"
                                        // value={this.state.message}
                                        onChange={this.formChange}>
                                    </textarea>

                                    <div className="s-text15 mb-2">
                                        Quantity:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="quantity"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Finish Size :
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="finish_size"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>

                                    <div className="s-text15 mb-2">
                                        Media (Paper, Vinyl, PVC, etc):
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
                                        name="media_desc"
                                        // value={this.state.message}
                                        onChange={this.formChange}>
                                    </textarea>

                                    <div className="s-text15 mb-2">
                                        Would you like to receive a proof?:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="radio"
                                            name="is_proof"
                                            // value={this.state.approach_details}
                                            id="is_proof-1"
                                            onChange={this.formChange} />
                                        <label htmlFor="is_proof-1">No Proof</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="radio"
                                            name="is_proof"
                                            // value={this.state.approach_details}
                                            id="is_proof-2"
                                            onChange={this.formChange} />
                                        <label htmlFor="is_proof-2">PDF Proof</label>
                                    </div>

                                    <div className="of-hidden check-cus">
                                        <input className="s-text7 p-l-22 p-r-22" type="radio"
                                            name="is_proof"
                                            // value={this.state.approach_details}
                                            id="is_proof-3"
                                            onChange={this.formChange} />
                                        <label htmlFor="is_proof-3">Hardcopy Proof</label>
                                    </div>

                                    <div className="flex-m flex-w p-b-10 mt-3">
                                        <div className="s-text15 mb-2">
                                            Upload a File. This will generate a more accurate quote.:
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

                                    <div className="s-text15 mb-2">
                                        Reference Old Job Number:
                                        {this.state.required ? (
                                            <span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
                                        ) : ('')}
                                    </div>
                                    <div className="bo4 of-hidden size15 m-b-20">
                                        <input className="sizefull s-text7 p-l-22 p-r-22" type="text"
                                            name="old_job_reference"
                                            // value={this.state.approach_details}
                                            onChange={this.formChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                                <button
                                    className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4"
                                    onClick={this.formSubmit}
                                    type="submit"
                                >
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
                </section>
            </React.Fragment>
        )
    }
}

export default CustomQuote;