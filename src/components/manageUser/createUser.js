import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createUser } from "../../store/actions/authActions";

class CreateUser extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userType: 2
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createUser(this.state);

    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    });
  };
  render() {
    const { authError, userTypes } = this.props;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create User</h5>
          <div className="input-field">
            <select
              id="userType"
              onChange={this.handleChange}
              className="browser-default"
            >
              {userTypes.map(userType => {
                return (
                  <option key={userType.id} value={userType.value}>
                    {userType.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    userTypes: state.firestore.ordered.userTypes || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: creds => dispatch(createUser(creds))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "userTypes" }])
)(CreateUser);
