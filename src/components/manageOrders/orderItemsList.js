import React, { Component } from "react";
import { formatePrice } from "../../helpers/utils";

import { Table } from "react-bootstrap";

class OrderItemsList extends Component {
  render() {
    const { groupedItems } = this.props;
    let total = 0;
    return (
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
    );
  }
}

export default OrderItemsList;
