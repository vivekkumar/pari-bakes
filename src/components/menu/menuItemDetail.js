import React, { Component } from "react";
import { formatePrice } from "../../helpers/utils";
import { Card } from "react-bootstrap";

class MenuItemDetail extends Component {
  render() {
    const { menuItem, onAction } = this.props;
    return (
      <Card className="mb-2 shadow-sm">
        <Card.Body>
          <div className="float-right">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onAction(menuItem)}
            >
              <i className="fas fa-times" />
            </button>
          </div>
          <img
            src={menuItem.imageUrl || "/img/default.png"}
            alt={menuItem.title}
            className="float-left mr-3 rounded img-thumbnail"
            style={{ width: 100, height: 100 }}
          />
          <div>
            <div>
              <strong>{menuItem.title}</strong>
            </div>
            <div>
              <small>{menuItem.description}</small>
            </div>
            <div>{formatePrice(menuItem.price)}</div>
            <small className="float-right">
              Created By - <em>{menuItem.authorFirstName}</em>
            </small>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default MenuItemDetail;
