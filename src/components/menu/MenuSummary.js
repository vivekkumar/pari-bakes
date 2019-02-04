import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class MenuSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  handleChange = e => {
    const { menu, onActivate } = this.props;
    e.preventDefault();
    onActivate(menu);
  };

  render() {
    const { menu, onDelete } = this.props;
    return (
      <Card key={menu.id}>
        <Card.Body>
          <button
            className="btn btn-danger btn-sm pull-right"
            onClick={e => {
              e.preventDefault();
              onDelete(menu);
            }}
          >
            <i className="glyphicon glyphicon-remove" />
          </button>
          <Link to={"/menu/" + menu.id}>
            <h4>{menu.title}</h4>
            <p>{menu.description}</p>
          </Link>
          <p className="grey-text">{menu.price}</p>
          <label>
            <input
              type="checkbox"
              className="filled-in"
              checked={menu.active}
              onChange={this.handleChange}
            />
            {" Activate"}
          </label>
        </Card.Body>
      </Card>
    );
  }
}

export default MenuSummary;
