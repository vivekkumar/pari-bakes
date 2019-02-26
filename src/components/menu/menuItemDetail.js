import React, { Component } from "react";
import { formatePrice } from "../../helpers/utils";
import { Card } from "react-bootstrap";

class MenuItemDetail extends Component {
  render() {
    const { menuItem } = this.props;
    return (
      <Card className="mb-2 shadow-sm">
        <Card.Body>
          <img
            src={
              "https://img.bestrecipes.com.au/RCK3slSo/h300-w400-cscale/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg"
            }
            alt={menuItem.title}
            className="float-left mr-3 rounded img-thumbnail"
            style={{ width: 100 }}
          />
          <div>
            <strong>{menuItem.title}</strong>
          </div>
          <small>{menuItem.description}</small>
          <div>{formatePrice(menuItem.price)}</div>
        </Card.Body>
      </Card>
    );
  }
}

export default MenuItemDetail;
