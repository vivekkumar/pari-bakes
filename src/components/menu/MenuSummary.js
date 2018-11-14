import React from "react";

const MenuSummary = ({ menu, onDelete, onActivate }) => {
  return (
    <div className="card z-depth-1 project-summary">
      <div className="card-content grey-text text-darken-3">
        <button
          className="btn btn-floating red lighten-1 active right"
          onClick={e => {
            e.preventDefault();
            onDelete(menu);
          }}
        >
          X
        </button>
        <span className="card-title ">{menu.title}</span>
        <p>{menu.description}</p>
        <p className="grey-text">{menu.price}</p>
        <label
          onClick={e => {
            e.preventDefault();
            onActivate(menu);
          }}
        >
          <input
            type="checkbox"
            className="filled-in"
            checked={menu.active}
            onChange={e => {
              e.preventDefault();
              onActivate(menu);
            }}
          />
          <span>Activate</span>
        </label>
      </div>
    </div>
  );
};

export default MenuSummary;
