import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class UserDashboard extends Component {
  render() {
    const { menu } = this.props;

    return (menu && <Redirect to={`/menu/${menu.id}`} />) || null;
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
