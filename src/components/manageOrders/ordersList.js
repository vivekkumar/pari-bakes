import React, { Component } from "react";

import { formatePrice } from "../../helpers/utils";

import OrderSummary from "./orderSummary";

class OrderList extends Component {
  render() {
    const { orders, statusType, title, showTotalPrice } = this.props;
    let filteredOrders = orders;
    let totalPrice = 0;

    if (statusType) {
      filteredOrders = orders.filter(o => o.status === statusType);
    }

    if (showTotalPrice) {
      filteredOrders.forEach(order => {
        totalPrice += parseInt(order.total, 10);
      });
    }

    return (
      <div>
        <h3>
          {title} {showTotalPrice && <span>({formatePrice(totalPrice)})</span>}
        </h3>

        {filteredOrders &&
          filteredOrders.map(order => (
            <OrderSummary key={order.id} order={order} />
          ))}
      </div>
    );
  }
}

export default OrderList;
