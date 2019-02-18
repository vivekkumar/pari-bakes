import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createMenu } from "../../store/actions/menuActions";
import { Redirect } from "react-router-dom";
import MenuSubCategory from "./MenuSubCategory";
import CollectionVList from "../common/CollectionVList";
import CreateMenuCategory from "./CreateMenuCategory";
import ActionControls from "../common/ActionControls";

import { Card, Form } from "react-bootstrap";

class CreateMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      categories: [],
      availableMenuItems: props.menuItems || [],
      showAddCategories: false,
      editableCategoryIndex: -1
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
    e.preventDefault();
    const { title, description, categories } = this.state;

    this.props.createMenu({
      title,
      description,
      categories
    });

    this.props.history.push("/");
  };

  createCategory = (cat, index) => {
    this.setState(prevState => {
      return {
        categories: [...prevState.categories, cat],
        showAddCategories: false
      };
    });
  };

  removeCategory = catIndex => {
    const cats = [...this.state.categories];
    cats.splice(catIndex, 1);

    this.setState({ categories: cats });
  };

  moveUp = catIndex => {
    if (catIndex <= 0) return;
    const cat = Object.assign({}, this.state.categories[catIndex]);
    const cats = [...this.state.categories];
    cats.splice(catIndex, 1);
    cats.splice(catIndex - 1, 0, cat);

    this.setState({ categories: cats });
  };

  moveDown = catIndex => {
    const cats = [...this.state.categories];
    if (catIndex >= cats.length - 1) return;
    const cat = Object.assign({}, this.state.categories[catIndex]);
    cats.splice(catIndex, 1);
    cats.splice(catIndex + 1, 0, cat);

    this.setState({ categories: cats });
  };

  handleAction = (type, index) => {
    switch (type) {
      case ActionControls.Types.MOVE_UP:
        this.moveUp(index);
        break;
      case ActionControls.Types.MOVE_DOWN:
        this.moveDown(index);
        break;
      case ActionControls.Types.EDIT:
        this.editCategory(index);
        break;
      case ActionControls.Types.REMOVE:
        this.removeCategory(index);
        break;
      default:
    }
  };

  getCategoryTemplate = props => {
    const { heading, menuItems } = props.item;
    const index = props.index;
    const actions = [
      ActionControls.Types.MOVE_UP,
      ActionControls.Types.MOVE_DOWN,
      ActionControls.Types.REMOVE
    ];
    return (
      <div className="shadow border rounded mb-4 p-3">
        <ActionControls
          data={index}
          actions={actions}
          onAction={this.handleAction}
        />
        <MenuSubCategory heading={heading} menuItems={menuItems} />
      </div>
    );
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
      showAddCategories,
      editableCategoryIndex
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
          editableCategory={categories[editableCategoryIndex]}
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
