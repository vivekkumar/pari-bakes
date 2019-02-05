import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

import MenuSubCategory from "./MenuSubCategory";
import { Card } from "react-bootstrap";

const MenuDetails = props => {
  const { menu, auth } = props;
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
  const id = ownProps.match.params.id;
  const menus = state.firestore.data.menu;
  const menu = menus ? menus[id] : null;
  return {
    menu: menu,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "menu"
    }
  ])
)(MenuDetails);
