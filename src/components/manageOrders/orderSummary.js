import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { formatePrice } from "../../helpers/utils";

import OrderActions from "./orderActions";

import OrderItemsList from "./orderItemsList";

class OrderSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggleExpand = () => {
    this.setState(prevState => {
      return { expanded: !prevState.expanded };
    });
  };

  getOrderNumber = () => {
    const { order } = this.props;
    const { createdOn } = order;
    const createdOnDate = createdOn.toDate();
    return `#${createdOnDate.getHours() * 10 + createdOnDate.getMinutes()} `;
  };

  render() {
    const { order } = this.props;
    const { items, status, createdOn, profile } = order;
    const { expanded } = this.state;
    const { address } = profile;

    return (
      <Card key={order.id} className={`mb-4 shadow-lg order-summary ${status}`}>
        <Card.Body>
          <div className="text-center">
            <small>
              Placed by{" "}
              <strong>
                <em>
                  {order.profile.firstName}{" "}
                  <span className="badge badge-primary">
                    {address
                      ? `${address.block}-${address.floor}${address.flatNumber}`
                      : `X-XXX`}
                  </span>
                </em>
              </strong>{" "}
              {moment(createdOn.toDate()).fromNow()} of{" "}
              <i className="fas fa-rupee-sign text-success" />
              {formatePrice(order.total)}
            </small>

            <div className="my-2">
              <strong>{this.getOrderNumber()}</strong>
              <button onClick={this.toggleExpand} className="btn btn-sm">
                <i
                  className={expanded ? "fas fa-caret-up" : "fas fa-caret-down"}
                />
                {expanded ? " Hide" : " Show"}
              </button>
            </div>
          </div>

          <div style={{ height: expanded ? "auto" : 0, overflow: "hidden" }}>
            <OrderItemsList groupedItems={items} />
          </div>
          <OrderActions order={order} />
        </Card.Body>
      </Card>
    );
  }
}

export default OrderSummary;
