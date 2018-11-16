import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import CollectionVList from "../common/CollectionVList";
import CreateMenuItem from "./CreateMenuItem";

class ManageMenu extends Component {
  state = {
    selectedMenuItem: {}
  };

  editMenuitem = menuItem => {
    this.setState({
      selectedMenuItem: menuItem
    });
  };

  getTemplate = item => {
    return (
      <div>
        {item.title}
        <a
          href="#!"
          className="secondary-content"
          onClick={e => {
            e.preventDefault();
            this.editMenuitem(item);
          }}
        >
          <i className="material-icons green-text">edit</i>
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
              <button
                className="btn btn-floating green lighten-2"
                onClick={e => {
                  e.preventDefault();
                  this.editMenuitem(null);
                }}
              >
                <i className="material-icons">add</i>
              </button>

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

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "menuItems", orderBy: ["title", "desc"] }])
)(ManageMenu);
