import React, { Component } from "react";

class MenuSubCategory extends Component {
  render() {
    const { heading, menuItems, onMenuItemAdd, profile } = this.props;
    const isNotAdmin = profile && profile.type >= 2;
    return (
      <section>
        <h2 className="text-center">{heading}</h2>
        {menuItems &&
          menuItems.map(menuItem => {
            return (
              <blockquote key={menuItem.id}>
                {isNotAdmin && (
                  <div>
                    <button
                      onClick={() => {
                        onMenuItemAdd(menuItem);
                      }}
                      className="btn btn-success rounded-circle btn-sm float-right mx-1"
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                )}

                <div className="float-right mx-1">
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
