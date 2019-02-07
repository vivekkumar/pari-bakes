import React, { Component } from "react";
import MenuList from "../menu/MenuList";
import Notifications from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

class SuperAdminDashboard extends Component {
  render() {
    const { menus, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <Row>
          <Col sm={6}>
            <h1 className="display-4">
              Menus
              <Link to="/createmenu" className="ml-4 text-success">
                <i className="fas fa-plus-circle" />
              </Link>
            </h1>
            <MenuList menus={menus} />
          </Col>

          <Col sm={{ span: 4, offset: 2 }}>
            <Notifications notifications={notifications} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menus: state.firestore.ordered.menu,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "menu", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(SuperAdminDashboard);
