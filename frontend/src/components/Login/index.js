import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import bannerShop from '../../api/bannerShop';
import Loader from 'react-loader-spinner';

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		logged: false,
	}

	onLogin = () => {
		this.props.onLogin();
	}

	loginHandler = () => {
		this.setState({
			logged: true
		});
		bannerShop.post('/auth/token/obtain/', {
			username: this.state.email,
			password: this.state.password
		})
			.then((res) => {
				if (res.status === 200) {
					const token = res.data.token;
					localStorage.setItem('token', token);
					this.onLogin();
					this.setState({
						logged: false
					});
					if(this.props.previousPath === '/shop/cart') {
						this.props.history.push('/shop/cart');
					} else {
						this.props.history.push('/');
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
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

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="email" placeholder="Enter your email"
										onChange={this.onEmailChange}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="password" name="password" placeholder="Enter your password"
										onChange={this.onPasswordChange}
									/>
								</div>

								<div className="size10 m-b-5" style={{ width: '100%' }}>
									<span className="m-r-5">Not Yet Register:</span>
									<Link to="/auth/signup" className="s-text7">Click Here</Link>
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




