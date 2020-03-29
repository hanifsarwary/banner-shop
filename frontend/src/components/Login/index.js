import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import bannerShop from '../../api/bannerShop';
import Loader from 'react-loader-spinner';

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		valid: true,
		logged: false
	}

	onLogin = () => {
		this.props.onLogin();
	}

	loginHandler = async () => {
		try {
			if (this.state.email === '' || this.state.password === '') {
				this.setState({
					valid: false
				});
			} else {
				this.setState({
					logged: true
				});

				const res = await bannerShop.post('/auth/token/obtain/', {
					username: this.state.email,
					password: this.state.password
				})

				if (res.status === 200) {
					const token = res.data.token;
					localStorage.setItem('token', token);
					this.onLogin();
					this.setState({
						logged: false
					});

					if (this.props.previousPath === '') {
						this.props.history.push('/');
					} else {
						this.props.history.push(this.props.previousPath);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	onEmailChange = (e) => {
		this.setState({
			email: e.target.value
		});
	}

	onPasswordChange = (e) => {
		this.setState({
			password: e.target.value
		});
	}

	render() {
		return (
			<section className="newproduct bgwhite p-t-45 p-b-50">
				<div className="container">
					<div className="row">
						<div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
							<form className="leave-comment" onSubmit={(e) => e.preventDefault()}>
								<h4 className="m-text26 p-b-36 p-t-15">
									Login to continue
								</h4>

								{this.state.required ? (
									<span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
								) : ('')}
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="email" placeholder="Enter your email"
										value={this.state.email}
										onChange={this.onEmailChange}
									/>
								</div>

								{this.state.required ? (
									<span style={{ color: '#e65540', marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>*</span>
								) : ('')}
								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="password" name="password" placeholder="Enter your password"
										value={this.state.password}
										onChange={this.onPasswordChange}
									/>
								</div>

								<div className="m-b-5" style={{ width: '100%' }}>
									<span className="m-r-5">New User? : </span>
									<Link to="/auth/signup" className="s-text7">
										<span style={{ fontSize: '14px' }}>Click here to create an account</span>
									</Link>
								</div>

								<div className="m-b-5" style={{ width: '100%' }}>
									{!this.state.valid ? (
										<span style={{ marginRight: '10px', fontWeight: '600', color: '#e65540' }}>Email and Password is required</span>
									) : (
											""
										)}
								</div>

								<div className="w-size25">
									<button
										className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4"
										onClick={this.loginHandler}
									>
										{this.state.logged ? (
											<div className="loader-container" style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginRight: '10px' }}>
												<Loader type="TailSpin" color="#fff" height={20} width={20} />
											</div>
										) : (
												""
											)}
										Login
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

export default withRouter(Login);




