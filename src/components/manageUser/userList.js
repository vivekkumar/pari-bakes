import React from "react";
import UserSummary from "./userSummary";

const UserList = ({ users, userTypes, currentUserId }) => {
  return (
    <div className="section">
      {users &&
        users.map(user => {
          return (
            <UserSummary
              key={user.id}
              user={user}
              userTypes={userTypes}
              currentUserId={currentUserId}
            />
          );
        })}
    </div>
  );
};

export default UserList;
