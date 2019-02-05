import React, { Component } from "react";

import { ListGroup, ListGroupItem, Form } from "react-bootstrap";

class MenuItemSelectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };

    this.el = null;
  }

  onClickHandler = e => {
    const { onClick } = this.props;

    if (onClick) {
      const checkBoxes = this.el.querySelectorAll("input[type='checkbox']");
      let seletedItems = [];
      checkBoxes.forEach(cb => {
        if (cb.checked) {
          seletedItems.push(JSON.parse(cb.dataset.item));
        }
      });

      onClick(seletedItems);
    }
  };

  render() {
    const { menuItems } = this.props;

    if (!(menuItems && menuItems.length)) return null;

    return (
      <div ref={el => (this.el = el)}>
        <ListGroup variant="flush">
          {menuItems.map(item => {
            return (
              <ListGroupItem key={item.id}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    onChange={this.onClickHandler}
                    data-item={JSON.stringify(item)}
                    label={item.title}
                  />
                </Form.Group>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default MenuItemSelectList;
