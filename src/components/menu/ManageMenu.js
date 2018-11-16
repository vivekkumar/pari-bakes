import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { deleteMenuItem } from "../../store/actions/menuActions";

import CollectionVList from "../common/CollectionVList";
import CreateMenuItem from "./CreateEditMenuItem";

class ManageMenu extends Component {
  state = {
    selectedMenuItem: {}
  };

  editMenuitem = menuItem => {
    this.setState({
      selectedMenuItem: menuItem
    });
  };

  deleteMenuitem = menuItem => {
    this.props.deleteMenuItem(menuItem.id);
  };

  getTemplate = item => {
    return (
      <div>
        <a
          href="#!"
          onClick={e => {
            e.preventDefault();
            this.editMenuitem(item);
          }}
        >
          {item.title}
        </a>
        <a
          href="#!"
          className="secondary-content"
          onClick={e => {
            e.preventDefault();
            this.deleteMenuitem(item);
          }}
        >
          <i className="material-icons red-text">delete</i>
        </a>
      </div>
    );
  };

  render() {
    const { auth, menuItems } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const { selectedMenuItem } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col m6">
            <div className="section">
              <h4>
                Menu Items
                <button
                  className="btn btn-floating green lighten-2 right"
                  onClick={e => {
                    e.preventDefault();
                    this.editMenuitem({});
                  }}
                >
                  <i className="material-icons">add</i>
                </button>
              </h4>

              <div className="section">
                {menuItems && (
                  <CollectionVList
                    items={menuItems}
                    itemTemplate={this.getTemplate}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col m6">
            <CreateMenuItem menuItem={selectedMenuItem} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuItems: state.firestore.ordered.menuItems,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteMenuItem: menuItem => dispatch(deleteMenuItem(menuItem))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "menuItems", orderBy: ["title", "desc"] }])
)(ManageMenu);
