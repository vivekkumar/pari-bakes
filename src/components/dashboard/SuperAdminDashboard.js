import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { deleteMenu, activateMenu } from "../../store/actions/menuActions";

import { Link } from "react-router-dom";
import MenuList from "../menu/MenuList";
import { Row, Col } from "react-bootstrap";

class SuperAdminDashboard extends Component {
  render() {
    const { menus, deleteMenuDisptach, activateMenuDispatch } = this.props;

    return (
      <div className="dashboard container">
        <Row>
          <Col sm={12}>
            <h1 className="display-4">
              Menus
              <Link to="/createmenu" className="ml-4 text-success">
                <i className="fas fa-plus-circle" />
              </Link>
            </h1>
            <MenuList
              menus={menus}
              onActivate={activateMenuDispatch}
              onDelete={deleteMenuDisptach}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menus: state.firestore.ordered.menu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMenuDisptach: menu => dispatch(deleteMenu(menu)),
    activateMenuDispatch: menu => dispatch(activateMenu(menu))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "menu", orderBy: ["createdAt", "desc"] }])
)(SuperAdminDashboard);
