import React from 'react';

class Login extends React.Component {
	render() {
		return (
			<section className="newproduct bgwhite p-t-45 p-b-50">
				<div className="container">
					<div className="row">
						<div className="col-sm-10 col-md-8 col-lg-4 m-l-r-auto">
							<form className="leave-comment">
								<h4 className="m-text26 p-b-36 p-t-15">
									Login to continue
						</h4>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="email" name="email" placeholder="Enter your email" />
								</div>

								<div className="bo4 of-hidden size15 m-b-20">
									<input className="sizefull s-text7 p-l-22 p-r-22" type="password" name="password" placeholder="Enter your password" />
								</div>

								<div className="w-size25">
									<button className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
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

export default Login;




