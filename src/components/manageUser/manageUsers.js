import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import UserList from "./userList";

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: props.users
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users !== nextProps.users) {
      this.setState({
        filteredUsers: nextProps.users
      });
    }
  }
  handleChange = e => {
    const str = e.target.value.toLowerCase();
    let filteredUsers = this.props.users;

    if (str && str.trim().length) {
      filteredUsers = this.props.users.filter(item => {
        if (
          item.firstName.toLowerCase().indexOf(str) >= 0 ||
          item.lastName.toLowerCase().indexOf(str) >= 0
        )
          return true;
        return false;
      });
    }

    this.setState({
      filteredUsers
    });
  };

  render() {
    const { auth, userTypes } = this.props;
    const { filteredUsers } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container">
        <Row>
          <Col sm={12}>
            <div className="display-4">
              Users
              <Link to="/createmnenuitem" className="ml-4 text-success">
                <i className="fas fa-plus-circle" />
              </Link>
            </div>
            <div className="display-4 my-4">
              <input
                type="text"
                className="p-2 border border-warning rounded"
                placeholder="Search user..."
                onChange={this.handleChange}
              />
            </div>
            <UserList
              users={filteredUsers}
              userTypes={userTypes}
              currentUserId={auth.uid}
            />
          </Col>
        </Row>
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
