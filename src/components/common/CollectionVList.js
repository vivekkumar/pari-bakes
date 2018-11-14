import React, { Component } from "react";

class CollectionVList extends Component {
  onClickHandler = item => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(item);
    }
  };
  render() {
    const { items, itemTemplate } = this.props;

    if (!(items && items.length)) return null;

    return (
      <ul className="collection">
        {items &&
          items.length &&
          items.map(item => {
            return (
              <li className="collection-item" key={item.id}>
                {itemTemplate(item, items)}
              </li>
            );
          })}
      </ul>
    );
  }
}

export default CollectionVList;
