import React from "react";
import { connect } from "react-redux";

import {
  changeOrderStatus,
  deleteOrder
} from "../../store/actions/cartActions";

class OrderActions extends React.Component {
  constructor(props) {
    super(props);
    this.orderStateTransitions = {
      open: { nextStatus: "processing", label: "Confirm Order" },
      //   accepted: { nextStatus: "processing", label: "Start Processing" },
      processing: { nextStatus: "delivered", label: "Out for delievery" },
      //   outForDelievery: { nextStatus: "delivered", label: "Delivered" },
      delivered: { nextStatus: "paymentDone", label: "Payment done" }
    };
  }

  render() {
    const {
      profile,
      order,
      changeOrderStatusAction,
      deleteOrderAction
    } = this.props;
    const nextStatus = this.orderStateTransitions[order.status];

    if (order.status === "paymentDone" || profile.type >= 2) return null;

    return (
      <div className="mt-3">
        <button
          className="btn btn-info btn-sm"
          onClick={() => {
            changeOrderStatusAction(order, nextStatus.nextStatus);
          }}
        >
          {nextStatus.label}
        </button>
        <button
          className="btn btn-sm btn-danger float-right"
          onClick={() => {
            deleteOrderAction(order);
          }}
        >
          Discard Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeOrderStatusAction: (o, newStatus) =>
      dispatch(changeOrderStatus(o, newStatus)),
    deleteOrderAction: o => dispatch(deleteOrder(o))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderActions);
