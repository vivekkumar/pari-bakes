import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import {
  changeOrderStatus,
  deleteOrder
} from "../../store/actions/cartActions";

import OrderSummary from "./orderSummary";

class TrackYourOrders extends Component {
  render() {
    const {
      orders,
      orderStatus,
      cancelOrderAction,
      deleteOrderAction
    } = this.props;

    return (
      <div className="container">
        {orders &&
          orders.map(order => (
            <OrderSummary
              key={order.id}
              order={order}
              orderStatus={orderStatus}
              onCancel={cancelOrderAction}
              onDelete={deleteOrderAction}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const allOrders = state.firestore.ordered.orders;
  const orders = allOrders && allOrders.filter(order => order.userId === uid);
  const orderStatus =
    state.firestore.data.orderStatus &&
    state.firestore.data.orderStatus["L23hEiqI8sghIiTcpENy"];

  return {
    orders,
    orderStatus,
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
  firestoreConnect([
    { collection: "orders", orderBy: ["createdOn", "desc"] },
    { collection: "orderStatus", doc: "L23hEiqI8sghIiTcpENy" }
  ])
)(TrackYourOrders);
