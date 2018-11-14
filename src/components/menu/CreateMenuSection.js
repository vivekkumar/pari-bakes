import React, { Component } from "react";

import CollectionVList from "../common/CollectionVList";

class CreateMenuSection extends Component {
  state = {
    heading: "",
    menuItems: [],
    error: { noItems: false, noHeading: false }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  addSection = e => {
    e.preventDefault();
    if (!this.state.heading.trim().length) {
      this.setState({ error: { noItems: false, noHeading: true } });
    } else if (this.state.menuItems.length === 0) {
      this.setState({ error: { noItems: true, noHeading: false } });
    } else {
      this.props.onCreate(this.state);
      this.setState({
        heading: "",
        menuItems: [],
        error: { noItems: false, noHeading: false }
      });
    }
  };

  addMenuitem = item => {
    this.setState(prevState => {
      return {
        menuItems: [...prevState.menuItems, item]
      };
    });
  };

  removeMenuItem = item => {
    const menuItems = [...this.state.menuItems];
    const indx = menuItems.indexOf(aItem => aItem.id === item.id);
    menuItems.splice(indx, 1);
    this.setState({
      menuItems
    });
  };

  getAvailableItemTemplate = item => {
    return (
      <div>
        {item.title}
        <a
          href="#!"
          className="secondary-content"
          onClick={e => {
            e.preventDefault();
            this.addMenuitem(item);
          }}
        >
          <i className="material-icons green-text">add</i>
        </a>
      </div>
    );
  };
  getSelectedItemTemplate = item => {
    return (
      <div>
        {item.title}
        <a
          href="#!"
          className="secondary-content"
          onClick={e => {
            e.preventDefault();
            this.removeMenuItem(item);
          }}
        >
          <i className="material-icons red-text lighten-1">close</i>
        </a>
      </div>
    );
  };
  render() {
    const { menuItems } = this.state;
    const { availableMenuItems } = this.props;

    return (
      <form
        className="white row create_menu_section"
        onSubmit={this.addSection}
      >
        <div className="input-field col m7">
          <input type="text" id="heading" onChange={this.handleChange} />
          <label htmlFor="heading">Section Heading</label>
          <CollectionVList
            items={menuItems}
            itemTemplate={this.getSelectedItemTemplate}
          />
          <div className="input-field">
            <button className="btn pink lighten-1" onClick={this.addSection}>
              Create Section
            </button>
          </div>
        </div>

        <div className="input-field col m4 offset-m1">
          <h6>Select menu items</h6>
          <CollectionVList
            items={availableMenuItems}
            itemTemplate={this.getAvailableItemTemplate}
          />
        </div>
      </form>
    );
  }
}

export default CreateMenuSection;
