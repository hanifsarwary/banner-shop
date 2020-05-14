import React from 'react';

class GlobalError extends React.Component {
  render() {
    return (
      <div className="error-modal">
        <div className="error-conetent">
          <h1>{this.props.message}</h1>
          <img src="/images/server.png"/>
        </div>
      </div>

    );
  }
}

export default GlobalError;
