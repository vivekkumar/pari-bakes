export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(d => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        const {
          firstName,
          lastName,
          phone,
          block,
          floor,
          flatNumber
        } = newUser;
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName,
            lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            address: {
              phone,
              block,
              floor,
              flatNumber,
              addressLine1: "Sankalp Cherry Blossom",
              addressLine2: "Varthur",
              city: "Bangalore",
              pin: "560087"
            },
            type: 2
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const createUser = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            type: parseInt(newUser.userType, 10)
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const removeUser = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    debugger;

    firebase
      .auth()
      .getUser(user.email)
      .delete()
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .delete();
      })
      .then(() => {
        dispatch({ type: "USER_REMOVE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "USER_REMOVE_SUCCESS", err });
      });
  };
};
