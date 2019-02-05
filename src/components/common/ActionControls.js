import React, { Component } from "react";

import { Nav } from "react-bootstrap";

class ActionControls extends Component {
  constructor(props) {
    super(props);
    this.createActions();
  }

  createActions = () => {
    const Types = ActionControls.Types;

    this.actions = {};
    for (const type in Types) {
      if (Types.hasOwnProperty(type)) {
        switch (type) {
          case ActionControls.Types.MOVE_UP:
            this.actions[type] = {
              icon: "fas fa-chevron-up",
              handler: this.moveUp
            };
            break;
          case ActionControls.Types.MOVE_DOWN:
            this.actions[type] = {
              icon: "fas fa-chevron-down",
              handler: this.moveDown
            };
            break;
          case ActionControls.Types.EDIT:
            this.actions[type] = {
              icon: "fas fa-edit",
              handler: this.edit
            };
            break;
          case ActionControls.Types.REMOVE:
            this.actions[type] = {
              icon: "fas fa-times text-danger",
              handler: this.remove
            };
            break;
          default:
        }
      }
    }
  };

  moveUp = e => {
    e.preventDefault();
    this.props.onAction(ActionControls.Types.MOVE_UP, this.props.index);
  };

  moveDown = e => {
    e.preventDefault();
    this.props.onAction(ActionControls.Types.MOVE_DOWN, this.props.index);
  };

  edit = e => {
    e.preventDefault();
    this.props.onAction(ActionControls.Types.EDIT, this.props.index);
  };

  remove = e => {
    e.preventDefault();
    this.props.onAction(ActionControls.Types.REMOVE, this.props.index);
  };

  render() {
    const { actions } = this.props;
    return (
      <Nav className="justify-content-end float-right">
        {actions &&
          actions.map(action => {
            const { icon, handler } = this.actions[action];
            return (
              <Nav.Item key={action}>
                <Nav.Link href="#" onClick={handler}>
                  <i className={icon} />
                </Nav.Link>
              </Nav.Item>
            );
          })}
      </Nav>
    );
  }
}

ActionControls.Types = {
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  EDIT: "EDIT",
  REMOVE: "REMOVE"
};

export default ActionControls;
