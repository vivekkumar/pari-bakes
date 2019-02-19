import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import {
  changeOrderStatus,
  deleteOrder
} from "../../store/actions/cartActions";

import { Row, Col } from "react-bootstrap";
import OrderList from "./ordersList";

class ManageOrders extends Component {
  render() {
    const { auth, orders } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="dashboard container-fluid">
        <Row>
          <Col sm={12}>
            <div className="display-4">Orders</div>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <h3>Open</h3>
            <OrderList orders={orders} statusType={"open"} />
          </Col>
          {/* <Col sm={2}>
            <h3>Accepted</h3>
            <OrderList
              orders={orders}
              statusType={"accepted"}
            />
          </Col> */}
          <Col sm={3}>
            <h3>Processing</h3>
            <OrderList orders={orders} statusType={"processing"} />
          </Col>
          {/* <Col sm={3}>
            <h3>Out for delievery</h3>
            <OrderList
              orders={orders}
              statusType={"outForDelievery"}
            />
          </Col> */}
          <Col sm={3}>
            <h3>Delivered</h3>
            <OrderList orders={orders} statusType={"delivered"} />
          </Col>
          <Col sm={3}>
            <h3>Payment Done</h3>
            <OrderList orders={orders} statusType={"paymentDone"} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const allOrders = state.firestore.ordered.orders;
  const orders = allOrders || [];

  return {
    orders,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelOrderAction: o => dispatch(changeOrderStatus(o, "cancelled")),
    deleteOrderAction: o => dispatch(deleteOrder(o))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "orders", orderBy: ["createdOn", "desc"] }])
)(ManageOrders);
