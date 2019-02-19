import React, { Component } from "react";

import OrderSummary from "./orderSummary";

class OrderList extends Component {
  render() {
    const { orders, statusType } = this.props;
    let filteredOrders = orders;

    if (statusType) {
      filteredOrders = orders.filter(o => o.status === statusType);
    }

    return (
      <div>
        {filteredOrders &&
          filteredOrders.map(order => (
            <OrderSummary key={order.id} order={order} />
          ))}
      </div>
    );
  }
}

export default OrderList;
