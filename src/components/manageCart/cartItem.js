import React from "react";
import { Row, Col } from "react-bootstrap";

import { formatePrice } from "../../helpers/utils";

import QuantityControl from "../common/QuantityControl";

class CartItem extends React.Component {
  handleChange = quantity => {
    const { onChange, cartItem } = this.props;

    return onChange && onChange(cartItem, quantity);
  };
  render() {
    const cartItem = this.props.cartItem;
    const { item, count } = cartItem;

    return (
      <Row className="my-3">
        <Col xs={4}>{item.title}</Col>
        <Col xs={4} className="text-center">
          {formatePrice(item.price)}
        </Col>
        <Col xs={4}>
          <QuantityControl quantity={count} onChange={this.handleChange} />
        </Col>
      </Row>
    );
  }
}

export default CartItem;
