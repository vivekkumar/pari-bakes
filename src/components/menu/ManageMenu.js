import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import MenuItemList from "./MenuItemList";

class ManageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMenuItems: props.menuItems
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menuItems !== nextProps.menuItems) {
      this.setState({
        filteredMenuItems: nextProps.menuItems
      });
    }
  }

  handleChange = e => {
    const str = e.target.value.toLowerCase();

    if (!str.trim().length) return;

    const filteredMenuItems = this.props.menuItems.filter(item => {
      if (
        item.title.toLowerCase().indexOf(str) >= 0 ||
        item.description.toLowerCase().indexOf(str) >= 0
      )
        return true;
      return false;
    });

    this.setState({
      filteredMenuItems
    });
  };

  render() {
    const { auth } = this.props;
    const { filteredMenuItems } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <div className="display-4">
              Menu Items
              <Link to="/createmnenuitem" className="ml-4 text-success">
                <i className="fas fa-plus-circle" />
              </Link>
            </div>
            <div className="my-4">
              <input
                type="text"
                className="p-2 border border-warning rounded w-100"
                placeholder="Search menu items..."
                onChange={this.handleChange}
              />
            </div>
            <MenuItemList menuItems={filteredMenuItems} />
          </Col>
        </Row>
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
