import { MenuActionTypes } from "../actions/types";
const initState = {
  menuItems: []
};

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case MenuActionTypes.CREATE_MENU_SUCCESS:
      console.log("create menu success");
      return state;
    case MenuActionTypes.CREATE_MENU_ERROR:
      console.log("create menu error");
      return state;

    case MenuActionTypes.CREATE_MENU_ITEM_SUCCESS:
      console.log("create menu item success");
      return Object.assign({}, state, {
        menuItems: [...state.menuItems, action.menuItem]
      });
    case MenuActionTypes.CREATE_MENU_ITEM_ERROR:
      console.log("create menu item error");
      return state;
    default:
      return state;
  }
};

export default menuReducer;
