import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default ComponentToRender => {
  class Authentication extends Component {
    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to="/signin" />;

      return <ComponentToRender {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
    };
  }
  return connect(mapStateToProps)(Authentication);
};
