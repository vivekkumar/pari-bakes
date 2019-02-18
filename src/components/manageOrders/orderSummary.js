import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { formatePrice } from "../../helpers/utils";

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
    const { order, orderStatus, onCancel, onDelete } = this.props;
    const { items, status, createdOn } = order;
    const { expanded } = this.state;
    const oStatus = orderStatus ? orderStatus[status] : {};

    return (
      <Card key={order.id} className={`mb-4 shadow-sm order-summary ${status}`}>
        <Card.Body>
          <div className="float-right text-right">
            <span className="badge badge-primary">Status: {status}</span>
            <div>{oStatus.message}</div>
          </div>
          <h3>
            <i className="fas fa-rupee-sign text-success" />
            {formatePrice(order.total)}
            <small>({moment(createdOn.toDate()).fromNow()})</small>
          </h3>

          <button onClick={this.toggleExpand}>
            {expanded ? "Close" : "Open"}
          </button>

          <div style={{ height: expanded ? "auto" : 0, overflow: "hidden" }}>
            {items &&
              items.map(item => {
                return (
                  <div key={item.item.id}>
                    {item.item.title} {item.count}
                  </div>
                );
              })}
          </div>

          <div className="mt-3">
            <button
              className="btn btn-info btn-sm mr-2"
              onClick={() => onCancel(order)}
            >
              Cancel Order
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(order)}
            >
              Delete Order
            </button>
            <em className="float-right">-{order.profile.firstName}</em>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default OrderSummary;
