import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import ActionControls from "../common/ActionControls";

class MenuSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.actions = [ActionControls.Types.REMOVE];
  }

  handleChange = e => {
    const { menu, onActivate } = this.props;
    e.preventDefault();
    onActivate(menu);
  };

  handleActions = type => {
    const { menu, onDelete } = this.props;
    onDelete(menu);
  };

  render() {
    const { menu } = this.props;
    return (
      <Card key={menu.id} className="mb-4 shadow-sm">
        <Card.Body>
          <ActionControls
            actions={this.actions}
            onAction={this.handleActions}
          />
          <Link to={"/menu/" + menu.id}>
            <h4>{menu.title}</h4>
            <p>{menu.description}</p>
          </Link>
          <p className="grey-text">{menu.price}</p>
          <label>
            <input
              type="checkbox"
              className="filled-in"
              checked={menu.active}
              onChange={this.handleChange}
            />
            {" Activate"}
          </label>
        </Card.Body>
      </Card>
    );
  }
}

export default MenuSummary;
