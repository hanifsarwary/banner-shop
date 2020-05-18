import React from 'react';
import bannerShop from '../../api/bannerShop';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class SignUp extends React.Component {
	state = {
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		approach_details: '',
		bussiness_type: '',
		address: '',
		city: '',
		company_name: '',
		country: '',
		fax_number: '',
		phone_number: '',
		resale_no: '',
		second_email: '',
		third_email: '',
		zip_code: '',
		loader: false,
		register: false,
	}

	signUpHandle = async () => {
		this.setState({
			loader: true
		});

		bannerShop.post('/api/customers/', {
			user: {
				username: this.state.username,
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
				password: this.state.password,
				is_staff: false
			},
			approach_details: this.state.approach_details,
			bussiness_type: this.state.bussiness_type,
			address: this.state.address,
			city: this.state.city,
			company_name: this.state.company_name,
			country: this.state.country,
			fax_number: this.state.fax_number,
			phone_number: this.state.phone_number,
			resale_no: this.state.resale_no,
			second_email: this.state.second_email,
			status: 1,
			third_email: this.state.third_email,
			zip_code: this.state.zip_code
		})
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					this.setState({
						username: '',
						first_name: '',
						last_name: '',
						email: '',
						password: '',
						loader: false,
						register: true,
						approach_details: '',
						bussiness_type: '',
						address: '',
						city: '',
						company_name: '',
						country: '',
						fax_number: '',
						phone_number: '',
						resale_no: '',
						second_email: '',
						status: null,
						third_email: '',
						zip_code: ''
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onChangeHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		const newState = { ...this.state };
		newState[name] = value;
		this.setState(newState);
	}

	async componentDidUpdate() {
		if (this.state.register) {
			window.setTimeout(() => {
				this.props.history.push('/');
			}, 2000);
		}

	}

	render() {
		return (
			<section className="newproduct bgwhite p-t-45 p-b-50">
				<div className="container">
					<h4 className="m-text26 p-b-36 p-t-15">
						Signup to keep shopping
					</h4>
					{this.state.register ? (
						<div className="size15">
							<span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>SignUp Successfully</span>
						</div>
					) : ("")}
					<div className="row">
						<div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
							<form className="leave-comment" onSubmit={(e) => e.preventDefault()}>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="username" placeholder="Enter your username"
										onChange={this.onChangeHandler}
										value={this.state.username}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="first_name" placeholder="Enter your first name"
										onChange={this.onChangeHandler}
										value={this.state.first_name}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="last_name" placeholder="Enter your last name"
										onChange={this.onChangeHandler}
										value={this.state.last_name}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="email" placeholder="Enter your email"
										onChange={this.onChangeHandler}
										value={this.state.email}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="password" name="password" placeholder="Enter your password"
										onChange={this.onChangeHandler}
										value={this.state.password}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="approach_details" placeholder="Enter approach details"
										onChange={this.onChangeHandler}
										value={this.state.approach_details}
									/>
								</div>

							</form>
						</div>
						<div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
							<form className="leave-comment" onSubmit={(e) => e.preventDefault()}>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="bussiness_type" placeholder="Enter your bussiness type"
										onChange={this.onChangeHandler}
										value={this.state.bussiness_type}
									/>
								</div>
								<textarea className="dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-20"
									name="address"
									placeholder="Enter your address"
									onChange={this.onChangeHandler}
									value={this.state.address}></textarea>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="city" placeholder="Enter your city"
										onChange={this.onChangeHandler}
										value={this.state.city}
									/>
								</div>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="company_name" placeholder="Enter your company name"
										onChange={this.onChangeHandler}
										value={this.state.company_name}
									/>
								</div>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="country" placeholder="Enter your country"
										onChange={this.onChangeHandler}
										value={this.state.country}
									/>
								</div>
							</form>
						</div>
						<div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
							<form className="leave-comment" onSubmit={(e) => e.preventDefault()}>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="fax_number" placeholder="Enter fax number"
										onChange={this.onChangeHandler}
										value={this.state.fax_number}
									/>
								</div>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="resale_no" placeholder="Enter resale number"
										onChange={this.onChangeHandler}
										value={this.state.resale_no}
									/>
								</div>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="second_email" placeholder="Enter second email"
										onChange={this.onChangeHandler}
										value={this.state.second_email}
									/>
								</div>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="third_email" placeholder="Enter third email"
										onChange={this.onChangeHandler}
										value={this.state.third_email}
									/>
								</div>
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="zip_code" placeholder="Enter zip code"
										onChange={this.onChangeHandler}
										value={this.state.zip_code}
									/>
								</div>

								<div className="w-size25">
									<button
										className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4"
										onClick={this.signUpHandle}
									>
										{this.state.loader ? (
											<div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: '10px' }}>
												<Loader type="TailSpin" color="#fff" height={20} width={20} />
											</div>
										) : (
												""
											)}
										Sign UP
									</button>
								</div>

							</form>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default withRouter(SignUp);