import React, { Component } from "react";

class MenuSubCategory extends Component {
  render() {
    const { heading, menuItems } = this.props;
    return (
      <section>
        <h2 className="text-center">{heading}</h2>
        {menuItems &&
          menuItems.map(menuItem => {
            return (
              <blockquote key={menuItem.id}>
                <div className="float-right">
                  {menuItem.price}
                  /-
                </div>
                <h5>{menuItem.title}</h5>
                <small>
                  <em>{menuItem.description}</em>
                </small>
                <hr />
              </blockquote>
            );
          })}
      </section>
    );
  }
}

export default MenuSubCategory;
