import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


export default (comp) => {
    
}
class AuthGaurd extends Component {
  render() {
    const { auth} = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList menu={menu} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default (Component) => {
    return connect(mapStateToProps)(AuthGaurd);
};

