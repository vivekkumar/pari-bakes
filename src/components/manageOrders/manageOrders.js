import React, { Component } from "react";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

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
            <OrderList title={"Opened"} orders={orders} statusType={"open"} />
          </Col>
          <Col sm={3}>
            <OrderList
              title={"Processing"}
              orders={orders}
              statusType={"processing"}
            />
          </Col>
          <Col sm={3}>
            <OrderList
              title={"Delivered"}
              orders={orders}
              statusType={"delivered"}
            />
          </Col>
          <Col sm={3}>
            <OrderList
              title={"Payment Done"}
              orders={orders}
              statusType={"paymentDone"}
              showTotalPrice={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.firestore.ordered.orders || [],
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "orders", orderBy: ["createdOn", "desc"] }])
)(ManageOrders);
