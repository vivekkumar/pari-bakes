import React from "react";
import { connect } from "react-redux";
import { removeUser } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import ActionControls from "../common/ActionControls";

const UserSummary = ({ user, userTypes, removeUser, currentUserId }) => {
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

  const actions = [ActionControls.Types.EDIT, ActionControls.Types.REMOVE];

  return (
    <Card className="shadow-sm my-2">
      <Card.Body>
        <ActionControls
          data={user}
          actions={actions}
          onAction={(type, index) => {
            switch (type) {
              case ActionControls.Types.EDIT:
                //this.editCategory(index);
                break;
              case ActionControls.Types.REMOVE:
                removeUser(user);
                break;
              default:
            }
          }}
        />
        <span className="card-title ">
          <Link to={"/user/" + user.id} key={user.id}>
            {user.firstName} {user.lastName}
            {currentUserId === user.id ? (
              <strong className="badge badge-warning mx-1">YOU</strong>
            ) : null}
          </Link>
        </span>
        <div className="my-2">
          <span className={`${userBadge}`}>{userType && userType.title}</span>
        </div>
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
