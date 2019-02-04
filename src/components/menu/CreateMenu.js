import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createMenu } from "../../store/actions/menuActions";
import { Redirect } from "react-router-dom";
import MenuSubCategory from "./MenuSubCategory";
import CollectionVList from "../common/CollectionVList";
import CreateMenuCategory from "./CreateMenuCategory";

import { Card, Form } from "react-bootstrap";

class CreateMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      categories: [],
      availableMenuItems: props.menuItems || [],
      showAddCategories: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menuItems !== nextProps.menuItems) {
      this.setState({
        availableMenuItems: [...nextProps.menuItems]
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    debugger;
    e.preventDefault();
    this.props.createMenu(this.state);
    this.props.history.push("/");
  };

  createCategory = cat => {
    this.setState(prevState => {
      return {
        categories: [...prevState.categories, cat],
        showAddCategories: false
      };
    });
  };

  removeCategory = cat => {};

  editCategory = cat => {};

  getCategoryTemplate = category => {
    const { heading, menuItems } = category.item;
    return <MenuSubCategory heading={heading} menuItems={menuItems} />;
  };
  showAddCategories = e => {
    e.preventDefault();
    this.setState({
      showAddCategories: true
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const {
      title,
      description,
      availableMenuItems,
      categories,
      showAddCategories
    } = this.state;

    return (
      <div className="container">
        <Card>
          <Card.Header>
            <h1 className="text-center">Create menu</h1>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="title">Menu Title</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  onChange={this.handleChange}
                  value={title}
                  placeholder="Menu title..."
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="content">Menu Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  id="description"
                  onChange={this.handleChange}
                  value={description}
                  placeholder="Describe your menu..."
                />
              </Form.Group>
              <div className="input-field menu-categories">
                <CollectionVList
                  items={categories}
                  ItemTemplate={this.getCategoryTemplate}
                />
              </div>
              <div className="input-field">
                <button
                  className="btn btn-info"
                  onClick={this.showAddCategories}
                >
                  Add Category
                </button>
                <button type="submit" className="btn btn-success float-right">
                  Save Menu
                </button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <CreateMenuCategory
          show={showAddCategories}
          onCreate={this.createCategory}
          availableMenuItems={availableMenuItems}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    menuItems: state.firestore.ordered.menuItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMenu: menu => dispatch(createMenu(menu))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "menuItems", orderBy: ["title", "desc"] }])
)(CreateMenu);
