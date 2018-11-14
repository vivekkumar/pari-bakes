import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import UserList from "./userList";
import CreateUser from "./createUser";

class ManageUsers extends Component {
  render() {
    const { users, auth, userTypes } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <UserList users={users} userTypes={userTypes} />
          </div>

          <div className="col s12 m6">
            <CreateUser />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firestore.ordered.users,
    userTypes: state.firestore.ordered.userTypes,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "users", orderBy: ["firstName", "desc"] },
    { collection: "userTypes", orderBy: ["title", "desc"] }
  ])
)(ManageUsers);
