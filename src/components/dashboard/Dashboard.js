import React, { Component } from "react";

import SuperAdminDashboard from "./SuperAdminDashboard";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

class Dashboard extends Component {
  render() {
    const { profile } = this.props;

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

export default Dashboard;
