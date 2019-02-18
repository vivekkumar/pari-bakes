import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

import { addMenuItemToCart } from "../../store/actions/cartActions";

import MenuSubCategory from "./MenuSubCategory";
import { Card } from "react-bootstrap";

const MenuDetails = props => {
  const { menu, auth, profile, addMenuItemToCart } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  if (menu) {
    return (
      <div className="container">
        <Card className="section menu-preview">
          <Card.Header className="text-center">
            <h1>{menu.title}</h1>
            {menu.description && (
              <h5 className="center-align grey-text">{menu.description}</h5>
            )}
          </Card.Header>

          <Card.Body>
            {menu.categories &&
              menu.categories.map((section, i) => {
                return (
                  <MenuSubCategory
                    key={i}
                    heading={section.heading}
                    menuItems={section.menuItems}
                    profile={profile}
                    onMenuItemAdd={m => {
                      addMenuItemToCart(m);
                    }}
                  />
                );
              })}
          </Card.Body>

          <Card.Footer>
            <div className="text-right">
              Created by{" "}
              <strong>
                {menu.authorFirstName} {menu.authorLastName}
              </strong>
              <div>
                <small>{moment(menu.createdAt.toDate()).calendar()}</small>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="container right">
        <p>Loading project...</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  let id = null;
  const menus = state.firestore.ordered.menu;
  let menu = null;

  if (ownProps.match && ownProps.match.params && ownProps.match.params.id) {
    id = ownProps.match.params.id;
  }

  if (menus) {
    if (id) menu = menus.filter(m => m.id === id)[0];
    else menu = menus.filter(m => m.active)[0];
  }
  return {
    menu: menu,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMenuItemToCart: menuItem => {
      dispatch(addMenuItemToCart(menuItem));
    }
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "menu", orderBy: ["title", "desc"] }])
)(MenuDetails);
