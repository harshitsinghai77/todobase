import { memo } from 'react';
import { Link } from 'react-router-dom';

import { APP_NAME } from '../../constants';

const Section1 = () => (
  <section className="headline-with-button p-24">
    <div>
      <div>
        <h1>Be productive with {APP_NAME}</h1>
        <p>
          {APP_NAME} is your little helper and companion to keep track of your
          daily and weekly tasks, tune out other noises or if you want to have a
          moment of calm and relax.
        </p>
      </div>

      <section className="get-started">
        <div className="form">
          <Link to="/dashboard">
            <input
              type="submit"
              className="btn"
              value="Get Started with Todobase"
            />
          </Link>
        </div>
      </section>
    </div>
    <div className="button">
      <img src="images/rocket.svg" width="80%" alt="To the moon" />
    </div>
  </section>
);

export default memo(Section1);
