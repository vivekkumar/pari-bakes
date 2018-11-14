import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

import AuthLinks from "../../helpers/authLinks";

class SignedInLinks extends React.Component {
  componentDidMount() {
    const elems = document.querySelector(".sidenav");
    window.M.Sidenav.init(elems, {});
  }
  render() {
    const { profile, mobile, signOut } = this.props;
    const authLinks = AuthLinks.getLinks(profile) || [];

    return (
      <ul className={`${mobile ? "sidenav" : "right"}`}>
        {authLinks.map((link, i) => {
          return (
            <li key={i}>
              <NavLink to={link.url}>{link.title}</NavLink>
            </li>
          );
        })}

        <li>
          <a onClick={signOut}>Log Out</a>
        </li>
        <li>
          <NavLink to="/" className="btn btn-floating pink lighten-3">
            {profile.initials} <small>{profile.flat}</small>
          </NavLink>
        </li>
      </ul>
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
