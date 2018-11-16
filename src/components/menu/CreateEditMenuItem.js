import React, { Component } from "react";
import { connect } from "react-redux";
import { createMenuItem, editMenuItem } from "../../store/actions/menuActions";
import { Redirect } from "react-router-dom";

class CreateEditMenuItem extends Component {
  state = {
    title: "",
    description: "",
    price: 0,
    halfPrice: 0,
    servings: 1
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.menuItem !== nextProps.menuItem) {
      if (nextProps.menuItem.id) {
        this.setState({ ...nextProps.menuItem });
      } else {
        this.setState({
          title: "",
          description: "",
          price: 0,
          halfPrice: 0,
          servings: 1
        });
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.menuItem.id;

    const item = {
      title: this.state.title,
      description: this.state.description,
      price: parseInt(this.state.price),
      halfPrice: parseInt(this.state.halfPrice),
      servings: parseInt(this.state.servings)
    };

    if (id) {
      this.props.editMenuItem(id, item);
    } else {
      this.props.createMenuItem(item);
    }
    this.setState({
      title: "",
      description: "",
      price: 0,
      halfPrice: 0,
      servings: 1
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const { title, description, price, halfPrice, servings } = this.state;
    const id = this.props.menuItem.id;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">
            {id ? `Edit ${title}` : "Create Menu Item"}
          </h5>
          <div className="input-field">
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              value={title}
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="description"
              className="materialize-textarea"
              onChange={this.handleChange}
              value={description}
            />
            <label htmlFor="content">Describe the taste!</label>
          </div>
          <div className="input-field">
            <input
              type="number"
              id="price"
              onChange={this.handleChange}
              value={price}
            />
            <label htmlFor="price">Price</label>
          </div>
          <div className="input-field">
            <input
              type="number"
              id="halfPrice"
              onChange={this.handleChange}
              value={halfPrice}
            />
            <label htmlFor="price">Half Price</label>
          </div>
          <div className="input-field">
            <input
              type="number"
              id="servings"
              onChange={this.handleChange}
              value={servings}
            />
            <label htmlFor="price">Servings</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">
              {id ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMenuItem: menuItem => dispatch(createMenuItem(menuItem)),
    editMenuItem: (id, menuItem) => dispatch(editMenuItem(id, menuItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEditMenuItem);
