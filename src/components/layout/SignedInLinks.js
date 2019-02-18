import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { signOut } from "../../store/actions/authActions";

import { Navbar, Nav } from "react-bootstrap";
import AuthLinks from "../../helpers/authLinks";

class SignedInLinks extends React.Component {
  handleLogOut = e => {};
  render() {
    const { profile, signOut, cart } = this.props;
    const authLinks = AuthLinks.getLinks(profile) || [];

    return (
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {authLinks.map(link => {
            return (
              <Nav.Item key={link.id}>
                <Link to={link.url}>
                  {link.title}{" "}
                  {link.id === "cart" &&
                    cart.menuItems &&
                    cart.menuItems.length !== 0 && (
                      <span className="badge badge-danger rounded-circle">
                        {cart.menuItems.length}
                      </span>
                    )}
                </Link>
              </Nav.Item>
            );
          })}
          <Nav.Item>
            <Link to={"/"} onClick={signOut}>
              Log Out
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/" className="user-img">
              {profile.initials} <small>{profile.flat}</small>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    );
  }
}

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  const userCart = state.firestore.data.userCart;

  return {
    cart: userCart && userCart[uid] ? userCart[uid] : { menuItems: [] }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "userCart" }])
)(SignedInLinks);
