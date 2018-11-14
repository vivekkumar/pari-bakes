import { MenuActionTypes } from "./types";

export const createMenu = menu => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("menu")
      .add({
        ...menu,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        active: false
      })
      .then(() => {
        dispatch({ type: MenuActionTypes.CREATE_MENU_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: MenuActionTypes.CREATE_MENU_ERROR }, err);
      });
  };
};

export const createMenuItem = menuItem => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("menuItems")
      .add({
        ...menuItem,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: MenuActionTypes.CREATE_MENU_ITEM_SUCCESS, menuItem });
      })
      .catch(err => {
        dispatch({ type: MenuActionTypes.CREATE_MENU_ITEM_ERROR }, err);
      });
  };
};

export const deleteMenu = menu => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("menu")
      .doc(menu.id)
      .delete()
      .then(() => {
        dispatch({ type: MenuActionTypes.DELETE_MENU_SUCCESS, menu });
      })
      .catch(err => {
        dispatch({ type: MenuActionTypes.DELETE_MENU_ERROR }, err);
      });
  };
};

export const activateMenu = menu => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("menu")
      .where("active", "==", true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          firestore
            .collection("menu")
            .doc(doc.id)
            .update({ active: false });
        });

        firestore
          .collection("menu")
          .doc(menu.id)
          .update({ active: true });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };
};
