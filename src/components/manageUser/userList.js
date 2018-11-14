import React from "react";
import UserSummary from "./userSummary";
import { Link } from "react-router-dom";

const UserList = ({ users, userTypes }) => {
  return (
    <div className="user-list section">
      {users &&
        users.map(user => {
          return (
            <Link to={"/user/" + user.id} key={user.id}>
              <UserSummary user={user} userTypes={userTypes} />
            </Link>
          );
        })}
    </div>
  );
};

export default UserList;
