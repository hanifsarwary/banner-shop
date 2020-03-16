import React from 'react';
import { Link } from 'react-router-dom';

// <a href="/" className="header-wrapicon1 dis-block">
//     <img src="/images/icons/icon-header-01.png" className="header-icon1" alt="ICON" />
// </a>
class UserAction extends React.Component {
    state = {
        dropdown: 'scale(0)'
    }

    toggle = () => {
        if (this.state.dropdown === 'scale(1)') {
            this.setState({
                dropdown: 'scale(0)'
            });
        } else {
            this.setState({
                dropdown: 'scale(1)',
            });
        }
    }

    componentDidUpdate() {
        document.body.addEventListener('click', (e) => {
            if (e.target.className !== 'header-icon1') {
                if (this.state.dropdown === 'scale(1)') {
                    this.setState({
                        dropdown: 'scale(0)',
                        loaded: true
                    });
                }
            }
        });
    }

    logoutHandler = () => {
        localStorage.removeItem('token');
        this.props.onLogout();
    }

    render() {
        return (
            <div className="header-wrapicon2">
                <img src="/images/icons/icon-header-01.png" className="header-icon1" alt="ICON" onClick={this.toggle} />

                {/* <div className="header-cart header-dropdown" style={{ transform: this.state.dropdown }}>
                    <a class="dropdown-item item-cus" href="/">Logout</a>
                </div> */}
                <div className="header-cart header-dropdown" style={{ transform: this.state.dropdown, width: '270px' }}>
                    <button className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4"
                        onClick={this.logoutHandler}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}

export default UserAction;