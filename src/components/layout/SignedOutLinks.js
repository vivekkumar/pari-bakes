import React from "react";

import { Navbar, Nav } from "react-bootstrap";

const SignedOutLinks = () => {
  return (
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
        <Nav.Item>
          <Nav.Link href="/signup">Signup</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/signin">Login</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  );
};

export default SignedOutLinks;
