import { CartActionTypes } from "../actions/types";

const initState = {
  menuItems: []
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEMS_TO_CART:
      let menuItems = [...state.menuItems, ...action.menuItems];
      return Object.assign({}, state, { menuItems });

    case CartActionTypes.REMOVE_FROM_CART_SUCCESS:
    default:
      return state;
  }
};

export default cartReducer;
