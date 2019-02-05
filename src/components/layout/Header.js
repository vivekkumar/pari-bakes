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
      <div>
        <Navbar collapseOnSelect bg="light" variant="light" className="mb-5">
          <Navbar.Brand>
            <Link to="/" className="brand-logo">
              Bakes
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
