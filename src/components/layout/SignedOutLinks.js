import React from "react";

import { Navbar, Nav } from "react-bootstrap";

const SignedOutLinks = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link href="/signup">Signup</Nav.Link>
        <Nav.Link href="/signin">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedOutLinks;
