import React from 'react';
import 'Pages/hubPages.styles.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="main-container">
      <div className="title-container">
        <h1 className="main-title"> G.C.C.M </h1>
      </div>
      <div className="links-container">
        <Link to="/sign-in-and-sign-up">
          <Button className="button" size="lg" variant="outline-primary">
            Log in/Sign up
          </Button>
        </Link>
        <Link to="/guest-page">
          <Button className="button" size="lg" variant="outline-primary">
            Continue as Guest
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
