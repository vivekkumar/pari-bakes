import React from "react";
import UserSummary from "./userSummary";

const UserList = ({ users, userTypes }) => {
  return (
    <div className="section">
      {users &&
        users.map(user => {
          return (
            <UserSummary key={user.id} user={user} userTypes={userTypes} />
          );
        })}
    </div>
  );
};

export default UserList;
