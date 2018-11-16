import React, { Component } from "react";

import CollectionVList from "../common/CollectionVList";

class CreateMenuSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: "",
      menuItems: [],
      remainingItems: props.availableMenuItems || [],
      error: { noItems: false, noHeading: false }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addSection = this.addSection.bind(this);
    this.addMenuitem = this.addMenuitem.bind(this);
    this.removeMenuItem = this.removeMenuItem.bind(this);
    this.getAvailableItemTemplate = this.getAvailableItemTemplate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.availableMenuItems &&
      nextProps.availableMenuItems !== this.props.availableMenuItems
    ) {
      this.setState({
        remainingItems: nextProps.availableMenuItems
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

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

  addMenuitem(item) {
    this.setState(prevState => {
      return {
        menuItems: [...prevState.menuItems, item],
        remainingItems: prevState.remainingItems.filter(
          aItem => aItem.id !== item.id
        )
      };
    });
  }

  removeMenuItem = item => {
    this.setState(prevState => {
      return {
        menuItems: prevState.menuItems.filter(aItem => aItem.id !== item.id),
        remainingItems: [...prevState.remainingItems, item]
      };
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
    const { menuItems, remainingItems } = this.state;
    return (
      <form
        className="white row create_menu_section"
        onSubmit={this.addSection}
      >
        <div className="input-field col m6">
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

        <div className="input-field col m6">
          <h6>Select menu items</h6>
          <CollectionVList
            items={remainingItems}
            itemTemplate={this.getAvailableItemTemplate}
          />
        </div>
      </form>
    );
  }
}

export default CreateMenuSection;
