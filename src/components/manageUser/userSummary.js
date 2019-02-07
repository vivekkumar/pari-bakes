import React from "react";
import { connect } from "react-redux";
import { removeUser } from "../../store/actions/authActions";

import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const UserSummary = ({ user, userTypes, removeUser }) => {
  const userType =
    userTypes && userTypes.filter(type => user.type === type.value)[0];

  let userBadge = "badge ";

  if (userType) {
    if (userType.value === 0) {
      userBadge += "badge-danger";
    } else if (userType.value === 1) {
      userBadge += "badge-success";
    } else {
      userBadge += "badge-primary";
    }
  }

  return (
    <Card className="shadow-sm my-4">
      <Card.Body>
        <span className="card-title ">
          <Link to={"/user/" + user.id} key={user.id}>
            {user.firstName} {user.lastName}
          </Link>
        </span>
        <span className={`${userBadge} mx-2`}>
          {userType && userType.title}
        </span>
        <button className="btn btn-danger" onClick={removeUser}>
          Delete
        </button>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: creds => dispatch(removeUser(creds))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserSummary);
