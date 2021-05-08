import React from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { StaticImage } from 'gatsby-plugin-image';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Fade top duration={1000} delay={500} distance="30px">
          <div>
            <div className="logo-container">
              <StaticImage
                className="logo"
                placeholder="blurred"
                width={130}
                height={130}
                src="../../images/redpanda-logo.png"
                alt="Redpanda"
              />
              <div className="menu">
                <h1>
                  <span className="website-title text-color-main">Redpanda Dashboard</span>
                </h1>
                <ul>
                  <li>
                    <a target="_blank" rel="noreferrer" href="https://redpandatoken.com/">
                      Redpanda Website
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom-header">
              <div className="site-description">
                RedPanda Earth ($REDPANDA) is a progressive deflationary token with animal charity
                use case focused on saving endangered species
              </div>
            </div>
          </div>
        </Fade>
      </Container>
    </header>
  );
};

export default Header;
