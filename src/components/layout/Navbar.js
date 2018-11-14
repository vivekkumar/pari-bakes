import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

class Navbar extends React.Component {
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );

    const mobileLinks = auth.uid ? (
      <SignedInLinks profile={profile} mobile={true} />
    ) : (
      <SignedOutLinks />
    );

    return (
      <div>
        <nav className="nav-wrapper grey darken-3">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Bakes
            </Link>
            <a href="#" data-target="mobile-menu" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {links}
          </div>
        </nav>
        {mobileLinks}
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

export default connect(mapStateToProps)(Navbar);
