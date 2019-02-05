import React from "react";
import { Link } from "react-router-dom";
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
              <Nav.Item key={i}>
                <Link to={link.url}>{link.title}</Link>
              </Nav.Item>
            );
          })}
          <Nav.Item>
            <Link to={"null"} onClick={signOut}>
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

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
