import React from 'react';
import { withRouter } from 'react-router-dom';
import bannerShop from '../../api/bannerShop';
import Loader from 'react-loader-spinner';

class SignUp extends React.Component {
	state = {
        username: '',
        first_name: '',
        last_name: '',
		email: '',
        password: '',
        loader: false,
		register: false,
    }
    
    // {
    //     "username": "",
    //     "first_name": "",
    //     "last_name": "",
    //     "email": "",
    //     "password": "",
    //     "is_staff": false
    // }

    signUpHandle = () => {
        this.setState({
            loader: true
        });

        bannerShop.post('/api/users', {
            username: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            is_staff: false
		})
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					this.setState({
						loader: false
					});
                }
                // return res; 
			})
			.catch((err) => {
                console.log(err);
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
									Signup to keep shoping
								</h4>

                                <div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="username" placeholder="Enter your username"
										onChange={(e) => this.setState({ username: e.target.value })}
									/>
								</div>

                                <div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="fisrtname" placeholder="Enter your first name"
										onChange={(e) => this.setState({ first_name: e.target.value })}
									/>
								</div>

                                <div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="lastname" placeholder="Enter your last name"
										onChange={(e) => this.setState({ last_name: e.target.value })}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="input" name="email" placeholder="Enter your email"
										onChange={(e) => this.setState({ email: e.target.value })}
									/>
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="password" name="password" placeholder="Enter your password"
										onChange={(e) => this.setState({ password: e.target.value })}
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

export default SignUp;