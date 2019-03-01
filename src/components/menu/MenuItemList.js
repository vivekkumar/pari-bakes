import React from "react";

import MenuItemDetail from "./menuItemDetail";

const MenuItemList = ({ menuItems, onAction }) => {
  return (
    <div className="menu-item-list">
      {menuItems &&
        menuItems.map(item => {
          return (
            <MenuItemDetail menuItem={item} key={item.id} onAction={onAction} />
          );
        })}
    </div>
  );
};

export default MenuItemList;
