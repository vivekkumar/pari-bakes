import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

const UserDetails = props => {
  const { user, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (user) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-2">
          <div className="card-content">
            <span className="card-title">
              {user.firstName} {user.lastName}
            </span>
            <p>{user.content}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const user = users ? users[id] : null;
  return {
    user,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(UserDetails);
