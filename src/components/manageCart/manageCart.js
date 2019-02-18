import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

import { formatePrice } from "../../helpers/utils";

import {
  addMenuItemToCart,
  removeMenuItemToCart,
  placeOrder
} from "../../store/actions/cartActions";

import { Row, Col, Card } from "react-bootstrap";

import CartItem from "./cartItem";
import ConfrimOrder from "../manageOrders/confirmOrder";

class ManageCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOrderConfirmation: false
    };
  }

  handleCartItemChange = (cartItem, newQunatity) => {
    const { incrementItem, decrementItem } = this.props;

    if (cartItem.count < newQunatity) {
      incrementItem(cartItem.item);
    } else {
      decrementItem(cartItem.item);
    }
  };

  groupItems = () => {
    const menuItems = this.props.cart.menuItems || [];
    let group = [];
    let groupMap = {};
    let idx = -1;

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];

      if (!groupMap[item.id]) {
        groupMap[item.id] = true;
        group.push({
          item,
          count: 0
        });
      }

      idx = group.findIndex(gItem => gItem.item.id === item.id);
      group[idx].count++;
    }

    return group;
  };

  getTotalPrice = () => {
    const menuItems = this.props.cart.menuItems || [];
    let total = 0;
    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];

      total += parseInt(item.price, 10);
    }

    return total.toFixed(1);
  };

  confirmOrder = () => {
    this.setState({
      showOrderConfirmation: true
    });
  };

  placeOrder = () => {
    const groupedItems = this.groupItems();
    this.props.placeOrder(groupedItems);
    this.setState({
      showOrderConfirmation: false
    });
  };

  render() {
    const { auth } = this.props;
    const { showOrderConfirmation } = this.state;
    if (!auth.uid) return <Redirect to="/signin" />;

    const groupedItems = this.groupItems();
    const total = this.getTotalPrice();

    const isCartEmpty = groupedItems && groupedItems.length;

    return (
      <div className="container">
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card>
              <Card.Header>
                <div className="display-4">
                  Cart
                  <i className="fas fa-shopping-cart text-warning float-right position-relative" />
                </div>
              </Card.Header>

              <Card.Body>
                {isCartEmpty ? (
                  groupedItems.map(cartItem => (
                    <CartItem
                      key={cartItem.item.id}
                      cartItem={cartItem}
                      onChange={this.handleCartItemChange}
                    />
                  ))
                ) : (
                  <h1 className="display-4 text-center">No items found!</h1>
                )}
                <hr />
                <h3 className="text-center">
                  <i className="fas fa-rupee-sign mr-2" />
                  {formatePrice(total)}
                </h3>
              </Card.Body>

              <Card.Footer>
                {!!isCartEmpty ? (
                  <button
                    className="btn btn-success"
                    onClick={this.confirmOrder}
                  >
                    Check out
                  </button>
                ) : (
                  <Link className="btn btn-info btn-lg" to="/">
                    Today's Menu
                  </Link>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <ConfrimOrder
          show={showOrderConfirmation}
          groupedItems={groupedItems}
          onOrderPlace={this.placeOrder}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const userCart = state.firestore.data.userCart;

  return {
    cart: userCart && userCart[uid] ? userCart[uid] : { menuItems: [] },
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementItem: menuItem => dispatch(addMenuItemToCart(menuItem)),
    decrementItem: menuItem => dispatch(removeMenuItemToCart(menuItem)),
    placeOrder: order => dispatch(placeOrder(order))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "userCart" }])
)(ManageCart);
