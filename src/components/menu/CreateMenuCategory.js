import React, { Component } from "react";

import { Modal, Row, Col, Form } from "react-bootstrap";

import MenuItemSelectList from "./MenuItemSelectList";

class CreateMenuCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      menuItems: [],
      availableMenuItems: props.availableMenuItems || [],
      error: { noItems: false, noHeading: false },
      show: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.availableMenuItems !== nextProps.availableMenuItems) {
      this.setState({
        availableMenuItems: nextProps.availableMenuItems
      });
    }

    if (this.state.show !== nextProps.show) {
      this.setState({
        show: nextProps.show
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  addCategory = e => {
    e.preventDefault();
    if (!this.state.heading.trim().length) {
      this.setState({ error: { noItems: false, noHeading: true } });
    } else if (this.state.menuItems.length === 0) {
      this.setState({ error: { noItems: true, noHeading: false } });
    } else {
      this.props.onCreate({
        heading: this.state.heading,
        menuItems: this.state.menuItems
      });
      this.setState({
        heading: "",
        menuItems: [],
        error: { noItems: false, noHeading: false },
        availableMenuItems: this.props.availableMenuItems,
        editiableCategory: null
      });
    }
  };

  addMenuitem = items => {
    const menuItems = [...items];

    this.setState({
      menuItems
    });
  };

  render() {
    const { availableMenuItems, show } = this.state;

    return (
      <Modal
        show={show}
        backdrop={true}
        onHide={() => {
          this.setState({ show: false });
        }}
      >
        <Modal.Header>
          <h4 className="text-center">Menu sub category</h4>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <Form onSubmit={this.addCategory}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="heading"
                    placeholder="Category title"
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <MenuItemSelectList
                  menuItems={availableMenuItems}
                  onClick={this.addMenuitem}
                />

                <Form.Group>
                  <button className="btn btn-info" onClick={this.addCategory}>
                    Create Section
                  </button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default CreateMenuCategory;
