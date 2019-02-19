import React, { Component } from "react";
import moment from "moment";

import { Card } from "react-bootstrap";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleExpand = () => {
    this.setState(prevState => {
      return { expanded: !prevState.expanded };
    });
  };

  render() {
    const { notifications } = this.props;
    const { expanded } = this.state;

    return (
      <div className="section notifications">
        <div style={{ height: expanded ? "auto" : 0, overflow: "hidden" }}>
          {notifications &&
            notifications.map(item => {
              return (
                <Card key={item.id} className="mb-1 shadow-sm p-0">
                  <Card.Body>
                    <small>
                      <em className="pink-text">{item.user}, </em>
                      <span>{item.content}</span>{" "}
                      {moment(item.time.toDate()).fromNow()}
                    </small>
                  </Card.Body>
                </Card>
              );
            })}
        </div>

        <button
          className="btn btn-success px-3 py-2 shadow-lg rounded-circle float-right"
          onMouseOver={this.toggleExpand}
          onMouseOut={this.toggleExpand}
        >
          <i className="fas fa-info" />
        </button>
      </div>
    );
  }
}

export default Notifications;
