import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SuperAdminDashboard from "./SuperAdminDashboard";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

class Dashboard extends Component {
  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (profile.isLoaded) {
      switch (profile.type) {
        case 0:
          return <SuperAdminDashboard />;
        case 1:
          return <AdminDashboard />;
        case 2:
          return <UserDashboard />;
        default:
          return null;
      }
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Dashboard);