import React, { Component } from "react";
import { connect } from "react-redux";
import { createMenuItem } from "../../store/actions/menuActions";
import { Redirect } from "react-router-dom";

class CreateMenuItem extends Component {
  state = {
    title: "",
    description: "",
    price: 0,
    halfPrice: 0,
    servings: 1,
    id: null
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.menuItem !== nextProps.menuItem) {
      if (nextProps.menuItem) {
        this.setState({ ...nextProps.menuItem });
      } else {
        this.setState({
          title: "",
          description: "",
          price: 0,
          halfPrice: 0,
          servings: 1,
          id: null
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
    this.props.createMenuItem(this.state);
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    const { id, title, description, price, halfPrice, servings } = this.state;
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
    createMenuItem: project => dispatch(createMenuItem(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMenuItem);
