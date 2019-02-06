import React from "react";

import { Card } from "react-bootstrap";

const MenuItemList = ({ menuItems, onDelete, onActivate }) => {
  return (
    <div className="menu-item-list">
      {menuItems &&
        menuItems.map(item => {
          return (
            <Card key={item.id} className="mb-4 shadow-sm">
              <Card.Header>{item.title}</Card.Header>
              <Card.Body>{item.description}</Card.Body>
              <Card.Footer>
                {item.price}
                {item.halfPrice && (
                  <small className="mx-3">{item.halfPrice}</small>
                )}
              </Card.Footer>
            </Card>
          );
        })}
    </div>
  );
};

export default MenuItemList;
