import React from 'react';
import 'Pages/page.styles.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="navigation-page">
      <div className="user-interface-window">
        <div className="landinging-page-buttons">
          <h1 className="main-title"> G.C.C.M </h1>
          <div className="links">
            <Link to="/sign-in-and-sign-up">
              <Button size="lg" variant="outline-primary">
                Log in/Sign up
              </Button>
            </Link>
            <Link to="/guest-page">
              <Button size="lg" variant="outline-primary">
                Continue as Guest
              </Button>{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
