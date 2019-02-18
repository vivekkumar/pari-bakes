import React, { Component } from "react";

import OrderSummary from "./orderSummary";

class OrderList extends Component {
  render() {
    const { orders, orderStatus, statusType } = this.props;
    const filteredOrders = orders.filter(o => o.status === statusType);
    return (
      <div>
        {filteredOrders &&
          filteredOrders.map(order => (
            <OrderSummary
              key={order.id}
              order={order}
              orderStatus={orderStatus}
              //   onCancel={cancelOrderAction}
              //   onDelete={deleteOrderAction}
            />
          ))}
      </div>
    );
  }
}

export default OrderList;
