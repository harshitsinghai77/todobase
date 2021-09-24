import { useState } from 'react';
import PropTypes from 'prop-types';
import { DashboardHeader } from './layout/DashboardHeader';
import { Content } from './layout/Content';
import { ProjectsProvider, SelectedProjectProvider } from '../context';

const Dashboard = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          <DashboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

Dashboard.propTypes = {
  darkModeDefault: PropTypes.bool,
};

export default Dashboard;
