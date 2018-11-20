import React, { Component } from "react";

class MenuSection extends Component {
  render() {
    const { heading, menuItems } = this.props;
    return (
      <div className="menu-section">
        <h5 className="center-align">{heading}</h5>
        <ul>
          {menuItems.map((item, i) => {
            return (
              <li key={i}>
                <span className="right bold">{item.price}/-</span>
                <div className="menu-section-heading">{item.title}</div>
                <small>{item.description}</small>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MenuSection;
