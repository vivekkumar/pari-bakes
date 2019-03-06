import React, { Component } from "react";

class MenuSubCategory extends Component {
  render() {
    const { heading, menuItems, onMenuItemAdd, profile } = this.props;
    const isNotAdmin = profile && profile.type >= 2;
    return (
      <section>
        <h2 className="text-center m-4">{heading}</h2>
        {menuItems &&
          menuItems.map(menuItem => {
            return (
              <blockquote className="clearfix" key={menuItem.id}>
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

                <img
                  src={menuItem.imageUrl || "/img/default.png"}
                  alt={menuItem.title}
                  className="float-left mr-3 rounded img-thumbnail"
                  style={{ width: 60, height: 60 }}
                />

                <div className="float-right mx-1">
                  {menuItem.price}
                  /-
                </div>

                <h5>{menuItem.title}</h5>
                {!isNotAdmin && (
                  <small>
                    <em>{menuItem.description}</em>
                  </small>
                )}
                <hr />
              </blockquote>
            );
          })}
      </section>
    );
  }
}

export default MenuSubCategory;
