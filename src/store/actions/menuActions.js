import firebase from "firebase";
import { MenuActionTypes } from "./types";

const MenuItemPhotosPath = "menuItemPhotos";

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
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const { title, description, price, halfPrice, servings, file } = menuItem;
    const createdAt = new Date();
    const fileName = `${MenuItemPhotosPath}/title-${createdAt.getTime()}`;

    const saveMenuItem = imageUrl => {
      debugger;
      firestore
        .collection("menuItems")
        .add({
          title,
          description,
          price,
          halfPrice,
          servings,
          imageUrl,
          authorFirstName: profile.firstName,
          authorLastName: profile.lastName,
          authorId: authorId,
          createdAt
        })
        .then(() => {
          dispatch({
            type: MenuActionTypes.CREATE_MENU_ITEM_SUCCESS,
            menuItem
          });
        })
        .catch(err => {
          dispatch({ type: MenuActionTypes.CREATE_MENU_ITEM_ERROR }, err);
        });
    };

    if (file) {
      firebase
        .storage()
        .ref(fileName)
        .put(file)
        .then(ss => {
          firebase
            .storage()
            .ref(fileName)
            .getDownloadURL()
            .then(url => saveMenuItem(url));
        })
        .catch(e => saveMenuItem());
    } else {
      saveMenuItem();
    }
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

export const deleteMenuItem = menuItem => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("menuItems")
      .doc(menuItem.id)
      .delete()
      .then(() => {
        dispatch({ type: MenuActionTypes.DELETE_MENU_SUCCESS, menuItem });
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
