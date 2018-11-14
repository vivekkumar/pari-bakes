import React from "react";
import MenuSummary from "./MenuSummary";
import { Link } from "react-router-dom";

const MenuList = ({ menus, onDelete, onActivate }) => {
  return (
    <div className="project-list">
      {menus &&
        menus.map(menu => {
          return (
            <div className="row" key={menu.id}>
              <div className="col s12 m8">
                <Link to={"/menu/" + menu.id}>
                  <MenuSummary
                    menu={menu}
                    onDelete={onDelete}
                    onActivate={onActivate}
                  />
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MenuList;
