import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createMenu } from "../../store/actions/menuActions";
import { Redirect, Link } from "react-router-dom";
import MenuSection from "./MenuSection";
import CollectionVList from "../common/CollectionVList";
import CreateMenuSection from "./CreateMenuSection";

class CreateMenu extends Component {
  state = {
    title: "",
    description: "",
    sections: [],
    availableMenuItems: []
  };
  componentDidMount() {
    const elem = document.querySelector("#addSectionModal");
    this.addSectionModal = window.M.Modal.init(elem, {});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menuItems !== nextProps.menuItems) {
      this.setState({
        availableMenuItems: [...nextProps.menuItems]
      });
    }
  }

  componentWillUnmount() {
    this.addSectionModal.destroy();
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createMenu(this.state);
    this.props.history.push("/");
  };

  addSection = section => {
    this.setState(prevState => {
      return {
        sections: [...prevState.sections, section]
      };
    });
    this.addSectionModal.close();
  };

  getSections = section => {
    return <MenuSection {...section} />;
  };
  showAddSection = e => {
    e.preventDefault();
    this.addSectionModal.open();
  };
  render() {
    const { auth, menuItems } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const { title, description, availableMenuItems, sections } = this.state;

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">
            Create a New Menu
            <button className="btn pink lighten-1 right">Create Menu</button>
          </h5>
          <div className="input-field ">
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              value={title}
              placeholder={title}
            />
            <label htmlFor="title">Menu Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="description"
              className="materialize-textarea"
              onChange={this.handleChange}
              value={description}
              placeholder={description}
            />
            <label htmlFor="content">Menu Description</label>
          </div>
          <div className="input-field menu-sections">
            <CollectionVList items={sections} itemTemplate={this.getSections} />
          </div>
          <div className="input-field">
            <button
              className="btn green lighten-1"
              onClick={this.showAddSection}
            >
              Add Section
            </button>
          </div>
        </form>

        <div id="addSectionModal" className="modal">
          <div className="modal-content">
            <h4>Create Menu Section</h4>
            <CreateMenuSection
              onCreate={this.addSection}
              availableMenuItems={availableMenuItems}
            />
          </div>
        </div>
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
