import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Navbar } from "react-bootstrap";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

class Header extends React.Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );

    return (
      <div className="header">
        <Navbar
          collapseOnSelect
          expand="md"
          bg="light"
          variant="light"
          className="mb-5 shadow-sm"
          fixed="top"
        >
          <Navbar.Brand>
            <Link to="/" className="brand-logo">
              <img
                src="/img/logo.jpg"
                alt="Pari Bakes!"
                className="rounded-circle border"
              />{" "}
              Pari Bakes!
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {links}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Header);
