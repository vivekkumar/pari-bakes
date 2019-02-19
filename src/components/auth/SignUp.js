import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Card, Form } from "react-bootstrap";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: null,
    block: null,
    floor: null,
    flatNumber: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <Card className="m-auto shadow-sm" style={{ maxWidth: "500px" }}>
          <Card.Header>
            <h5 className="text-center">Sign Up</h5>
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
                <Form.Control
                  type="text"
                  id="firstName"
                  onChange={this.handleChange}
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="lastName"
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="number"
                  id="phone"
                  onChange={this.handleChange}
                  placeholder="Phone"
                />
              </Form.Group>

              <h4>
                Flat details:{" "}
                <span className="badge badge-info">
                  {this.state.block} - {this.state.floor}
                  {this.state.flatNumber}
                </span>
              </h4>

              <Form.Group>
                <Form.Control
                  id="block"
                  as="select"
                  className="mb-2"
                  onChange={this.handleChange}
                >
                  <option>Choose Block...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Control>

                <Form.Control
                  id="floor"
                  as="select"
                  className="mb-2"
                  onChange={this.handleChange}
                >
                  <option>Choose Floor...</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Control>

                <Form.Control
                  id="flatNumber"
                  as="select"
                  className="mb-2"
                  onChange={this.handleChange}
                >
                  <option>Choose flat number...</option>
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <div />
              </Form.Group>

              <Form.Group>
                <button className="btn btn-success">Sign up</button>
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
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
