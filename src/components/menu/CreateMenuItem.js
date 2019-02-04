import React, { Component } from "react";
import { connect } from "react-redux";
import { createMenuItem } from "../../store/actions/menuActions";
import { Redirect } from "react-router-dom";

class CreateMenuItem extends Component {
  state = {
    title: "",
    description: "",
    sections: []
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Menu Items</h5>
          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} />
            <label htmlFor="title">Title</label>
          </div>
          <div className="input-field">
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
            <label htmlFor="content">Describe the taste!</label>
          </div>
          <div className="input-field">
            <input type="number" id="price" onChange={this.handleChange} />
            <label htmlFor="price">Price</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
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
