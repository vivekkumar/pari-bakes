export const addMenuItemToCart = menuItem => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    firestore
      .collection("userCart")
      .doc(userId)
      .get()
      .then(s => {
        const cart = s.data();
        const menuItems = cart && cart.menuItems ? cart.menuItems : [];

        firestore
          .collection("userCart")
          .doc(userId)
          .set({
            profile,
            menuItems: [...menuItems, menuItem],
            lastUpdated: new Date()
          })
          .then(() => {
            console.log("item added in cart for user " + userId);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const removeMenuItemToCart = menuItem => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    firestore
      .collection("userCart")
      .doc(userId)
      .get()
      .then(s => {
        const cart = s.data();

        let menuItems = [...cart.menuItems];

        const inx = menuItems.findIndex(item => item.id === menuItem.id);

        menuItems.splice(inx, 1);

        firestore
          .collection("userCart")
          .doc(userId)
          .set({
            menuItems,
            lastUpdated: new Date()
          })
          .then(() => {
            console.log("userCart remove for " + userId);
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const emptyCart = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    firestore
      .collection("userCart")
      .doc(userId)
      .update({ menuItems: [] })
      .then(s => {
        console.log("Cart Reset");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const placeOrder = items => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += parseInt(items[i].item.price, 10) * parseInt(items[i].count, 10);
    }

    const newOrder = {
      items,
      userId,
      profile,
      status: "open",
      total,
      createdOn: new Date()
    };

    firestore
      .collection("orders")
      .add(newOrder)
      .then(s => {
        console.log(`new order placed!`);
        dispatch(emptyCart());
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const changeOrderStatus = (order, newStatus) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("orders")
      .doc(order.id)
      .update({
        status: newStatus
      })
      .then(s => {
        console.log(`Order cancelled!`);
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const deleteOrder = order => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("orders")
      .doc(order.id)
      .delete()
      .then(s => {
        console.log(`Order Deleted!`);
      })
      .catch(err => {
        console.error(err);
      });
  };
};
