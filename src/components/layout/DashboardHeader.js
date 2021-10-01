import { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { APP_NAME } from '../../constants';
import { AddTask } from '../AddTask';
import { useAuth } from '../../context/authContext';
import LightImage from './todobase_logo.png';
import DarkImage from './todobase_logo_dark.jpg';

export const DashboardHeader = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push('/');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <header className="dashboard-header" data-testid="header">
      <nav>
        <Link to="/">
          <div className="logo">
            <img src={darkMode ? DarkImage : LightImage} alt={APP_NAME} />
          </div>
        </Link>
        <div className="settings">
          <ul>
            {/* <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li> */}
            <li
              className="settings__darkmode"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </li>
            <li className="settings__logout" onClick={() => handleLogout()}>
              <RiLogoutCircleRLine />
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};

DashboardHeader.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
