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

  render() {
    const { order } = this.props;
    const { items, status, createdOn } = order;
    const { expanded } = this.state;
    const { address } = order.profile;

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
              {moment(createdOn.toDate()).fromNow()}
            </small>
            <div className="display-4 my-2">
              <i className="fas fa-rupee-sign text-success" />
              {formatePrice(order.total)}
            </div>
            {expanded ? (
              <button onClick={this.toggleExpand} className="btn btn-sm">
                <i className="fas fa-caret-down" /> Hide
              </button>
            ) : (
              <button onClick={this.toggleExpand} className="btn btn-sm">
                <i className="fas fa-caret-up" /> Show
              </button>
            )}
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
