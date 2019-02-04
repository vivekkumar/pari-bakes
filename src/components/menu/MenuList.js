import React from "react";
import MenuSummary from "./MenuSummary";

const MenuList = ({ menus, onDelete, onActivate }) => {
  return (
    <div className="project-list">
      {menus &&
        menus.map(menu => {
          return (
            <MenuSummary
              key={menu.id}
              menu={menu}
              onDelete={onDelete}
              onActivate={onActivate}
            />
          );
        })}
    </div>
  );
};

export default MenuList;
