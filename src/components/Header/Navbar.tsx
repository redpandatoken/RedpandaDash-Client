import React from 'react';
import { Navbar as N, Nav } from 'react-bootstrap';
import { StaticImage } from 'gatsby-plugin-image';

const Navbar = () => {
  return (
    <div>
      <N id="navbar" collapseOnSelect expand="lg" fixed="top">
        <N.Brand href="#">
          <span id="site-title">RedPanda Dashboard</span>
        </N.Brand>
        <N.Toggle aria-controls="responsive-navbar-nav" />
        <N.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active={false} target="_blank" href="https://redpandatoken.com/">
              RedPanda Website
            </Nav.Link>
          </Nav>
        </N.Collapse>
      </N>
    </div>
  );
};

export default Navbar;
