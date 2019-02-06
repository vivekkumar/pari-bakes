import React, { Component } from "react";
import { connect } from "react-redux";
import { createMenuItem } from "../../store/actions/menuActions";
import { Redirect } from "react-router-dom";

import { Card, Form } from "react-bootstrap";

class CreateMenuItem extends Component {
  state = {
    title: "",
    description: "",
    price: 0,
    halfPrice: 0,
    servings: 1
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createMenuItem(this.state);
    this.props.history.push("/menus");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <Card>
          <Card.Header>
            <h5 className="text-center">Create New Menu Item</h5>
          </Card.Header>
          <Card.Body>
            <Form className="white" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  id="title"
                  onChange={this.handleChange}
                  placeholder="Title..."
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows="3"
                  id="description"
                  onChange={this.handleChange}
                  placeholder="Describe the taste..."
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="price"
                  onChange={this.handleChange}
                  placeholder="Price"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  id="halfPrice"
                  onChange={this.handleChange}
                  placeholder="Half Portion Price"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Servings</Form.Label>
                <Form.Control
                  as="select"
                  id="servings"
                  onChange={this.handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <button className="btn btn-success">Create</button>
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
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMenuItem: menuItem => dispatch(createMenuItem(menuItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMenuItem);
