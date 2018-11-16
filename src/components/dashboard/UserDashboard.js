import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class UserDashboard extends Component {
  render() {
    return <Redirect to={`/menu`} />;
  }
}

export default UserDashboard;
