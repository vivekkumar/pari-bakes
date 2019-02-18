import React, { Component } from "react";

import { formatePrice } from "../../helpers/utils";

import { Modal, Table, Row, Col } from "react-bootstrap";

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
    let total = 0;

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
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th className="text-right">Qnty.</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedItems &&
                    groupedItems.map(({ item, count }, index) => {
                      total += parseInt(item.price, 10) * count;
                      return (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{formatePrice(item.price)}</td>
                          <td className="text-right">{count}</td>
                          <td className="text-right">
                            {formatePrice(item.price * count)}
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="h4">
                    <td>Total</td>
                    <td />
                    <td />
                    <td className="text-right">{formatePrice(total)}</td>
                  </tr>
                </tbody>
              </Table>
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
