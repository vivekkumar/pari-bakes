import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

const MenuDetails = props => {
  const { menu, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (menu) {
    return (
      <div className="container section menu-preview z-depth-4">
        <div className="card z-depth-0">
          <div className="card-content">
            <h2 className="center-align">{menu.title}</h2>
            <h5 className="center-align grey-text">"{menu.description}"</h5>
            <div className="section">
              {menu.sections &&
                menu.sections.map((section, i) => {
                  return (
                    <div key={i}>
                      <h4 className="center-align">{section.heading}</h4>
                      {section.menuItems &&
                        section.menuItems.map(menuItem => {
                          return (
                            <blockquote key={menuItem.id}>
                              <div className="right">
                                {menuItem.price}
                                /-
                              </div>
                              <h5>{menuItem.title}</h5>
                              <div>{menuItem.description}</div>
                            </blockquote>
                          );
                        })}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Created by {menu.authorFirstName} {menu.authorLastName}
            </div>
            <div>{moment(menu.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
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
