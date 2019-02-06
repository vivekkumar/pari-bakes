import React from "react";
import moment from "moment";

import { Card } from "react-bootstrap";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="section">
      <h1 className="display-4">Notifications</h1>
      {notifications &&
        notifications.map(item => {
          return (
            <Card key={item.id} className="mb-4 shadow-sm">
              <Card.Body>
                <em className="pink-text">{item.user}, </em>
                <span>{item.content}</span>
              </Card.Body>
              <Card.Footer>
                <div className="note-date grey-text">
                  {moment(item.time.toDate()).fromNow()}
                </div>
              </Card.Footer>
            </Card>
          );
        })}
    </div>
  );
};

export default Notifications;
