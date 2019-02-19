import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import OrderList from "./ordersList";

class TrackYourOrders extends Component {
  render() {
    const { orders } = this.props;

    return (
      <div className="container">
        <OrderList orders={orders} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const allOrders = state.firestore.ordered.orders;
  const orders = allOrders && allOrders.filter(order => order.userId === uid);

  return {
    orders,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "orders", orderBy: ["createdOn", "desc"] }])
)(TrackYourOrders);
