import React, { Component } from "react";
import MenuList from "../menu/MenuList";
import Notifications from "./Notifications";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import { deleteMenu, activateMenu } from "../../store/actions/menuActions";
import { Row, Col } from "react-bootstrap";

class AdminDashboard extends Component {
  onDelete = menu => {
    this.props.deleteMenu(menu);
  };

  onActivate = menu => {
    this.props.activateMenu(menu);
  };

  render() {
    const { menus, menuItems, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <Row>
          <Col sm={8}>
            <Link
              to="/createmenu"
              className="btn btn-primary btn-lg"
              style={{ marginBottom: "1em" }}
            >
              Create Menu
            </Link>
            <MenuList
              menus={menus}
              menuItems={menuItems}
              onDelete={this.onDelete}
              onActivate={this.onActivate}
            />
          </Col>
          <Col sm={4}>
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
    notifications: state.firestore.ordered.notifications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteMenu: menu => dispatch(deleteMenu(menu)),
    activateMenu: menu => dispatch(activateMenu(menu))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    { collection: "menu", orderBy: ["createdAt", "desc"] },
    { collection: "menuItems", orderBy: ["title", "desc"] },
    { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
  ])
)(AdminDashboard);
