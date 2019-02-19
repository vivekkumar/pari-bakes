import React, { Component } from "react";
import { Modal, Row, Col } from "react-bootstrap";

import OrderItemsList from "./orderItemsList";

class ConfrimOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      groupedItems: props.groupedItems
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groupedItems !== nextProps.groupedItems) {
      this.setState({
        groupedItems: nextProps.groupedItems
      });
    }

    if (this.state.show !== nextProps.show) {
      this.setState({
        show: nextProps.show
      });
    }
  }

  render() {
    const { show, groupedItems } = this.state;
    const { onOrderPlace } = this.props;

    return (
      <Modal
        show={show}
        backdrop={true}
        onHide={() => {
          this.setState({ show: false });
        }}
      >
        <Modal.Header>
          <h4 className="text-center">Confirm your order</h4>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <OrderItemsList groupedItems={groupedItems} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={onOrderPlace}>
            Place Order
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.setState({ show: false });
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfrimOrder;
