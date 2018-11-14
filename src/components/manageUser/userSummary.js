import React from "react";
import { connect } from "react-redux";
import { removeUser } from "../../store/actions/authActions";

const UserSummary = ({ user, userTypes, removeUser }) => {
  const userType =
    userTypes && userTypes.filter(type => user.type === type.value);
  return (
    <div className="card z-depth-1 user-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">
          {user.firstName} {user.lastName}
        </span>
        <p>{userType && userType[0].title}</p>
        <button className="btn btn-danger" onClick={removeUser}>
          Delete
        </button>
      </div>
    </div>
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
