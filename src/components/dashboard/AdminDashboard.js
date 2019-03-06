import React, { Component } from "react";
import MenuList from "../menu/MenuList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
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
    const { menus } = this.props;

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
              onDelete={this.onDelete}
              onActivate={this.onActivate}
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
    deleteMenu: menu => dispatch(deleteMenu(menu)),
    activateMenu: menu => dispatch(activateMenu(menu))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "menu", orderBy: ["createdAt", "desc"] }])
)(AdminDashboard);
