import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

import { Navbar, Nav } from "react-bootstrap";
import AuthLinks from "../../helpers/authLinks";

class SignedInLinks extends React.Component {
  render() {
    const { profile, signOut } = this.props;
    const authLinks = AuthLinks.getLinks(profile) || [];

    return (
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          {authLinks.map((link, i) => {
            return (
              <Nav.Link key={i} to={link.url}>
                {link.title}
              </Nav.Link>
            );
          })}
          <Nav.Link to={null} onClick={signOut}>
            Log Out
          </Nav.Link>

          <Nav.Link to="/" className="user-img">
            {profile.initials} <small>{profile.flat}</small>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
