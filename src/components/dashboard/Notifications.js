import React from "react";
import moment from "moment";

import { Card } from "react-bootstrap";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="section">
      <h2 className="card-title">Notifications</h2>
      {notifications &&
        notifications.map(item => {
          return (
            <Card key={item.id}>
              <Card.Body>
                <span className="pink-text">{item.user}, </span>
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
