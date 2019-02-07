import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { Card, Form } from "react-bootstrap";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <Card className="m-auto shadow-sm" style={{ maxWidth: "500px" }}>
          <Card.Header>
            <h5 className="text-center">Sign In</h5>
          </Card.Header>
          <Card.Body>
            <Form className="white" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="email"
                  id="email"
                  onChange={this.handleChange}
                  placeholder="Email..."
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  placeholder="Password..."
                />
              </Form.Group>

              <Form.Group>
                <button className="btn btn-success">Login</button>
                <div className="text-danger my-3">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
