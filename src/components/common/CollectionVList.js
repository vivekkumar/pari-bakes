import React, { Component } from "react";

import { ListGroup, ListGroupItem } from "react-bootstrap";

class CollectionVList extends Component {
  onClickHandler = item => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(item);
    }
  };

  getItemsTemplate = items => {
    const { ItemTemplate } = this.props;
    return items.map((item, index) => {
      return ItemTemplate ? (
        <ItemTemplate item={item} key={index} />
      ) : (
        <ListGroupItem>{item.toString()}</ListGroupItem>
      );
    });
  };

  render() {
    const { items } = this.props;

    if (!(items && items.length)) return null;

    return <ListGroup>{this.getItemsTemplate(items)}</ListGroup>;
  }
}

export default CollectionVList;
