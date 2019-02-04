import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

class UserDashboard extends Component {
  render() {
    const { menu, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <Row>
          <Col sm={12}>{menu && <Redirect to={`/menu/${menu.id}`} />}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const menus = state.firestore.ordered.menu || [];
  return {
    menu: menus.filter(m => m.active)[0],
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "menu", orderBy: ["createdAt", "desc"] }])
)(UserDashboard);
