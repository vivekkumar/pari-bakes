import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ManageMenu extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6" />
          <div className="col-md-6" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ManageMenu);
