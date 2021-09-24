import { LandingPageHeader, Section1 } from './components';

import './styles/main.scss';

function LandingPage() {
  return (
    <>
      <LandingPageHeader />
      <main>
        <div className="container">
          <Section1 />
        </div>
      </main>
    </>
  );
}

export default LandingPage;
