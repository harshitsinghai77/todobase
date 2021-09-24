import { memo } from 'react';
import { Link } from 'react-router-dom';

const LandingPageHeader = () => (
  <header>
    <div className="header-landing-page">
      <div className="menu">
        <Link to="/">
          <img
            className="logo"
            src="/images/todobase_logo.png"
            alt="Site logo"
          />
        </Link>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default memo(LandingPageHeader);
