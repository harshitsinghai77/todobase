import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

import app from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import { useAuth } from '../context/authContext';

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const { currentUser } = useAuth();
  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }
    return (
      task &&
      projectId &&
      currentUser &&
      app
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          taskDescription,
          date: collatedDate || taskDate,
          userId: currentUser.uid,
          createdAt: new firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          setTask('');
          setProject('');
          // setShowMain(false);
          setTaskDescription('');
          setShowProjectOverlay(false);
        })
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    showQuickAddTask ? addTask() && setShowQuickAddTask(false) : addTask();
  };

  const cancelAddTask = () => {
    setShowMain(false);
    setShowProjectOverlay(false);
    setTask('');
    setTaskDescription('');
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setShowMain(!showMain);
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setShowMain(false);
                      setShowProjectOverlay(false);
                      setShowQuickAddTask(false);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />

          <form onSubmit={handleAddTask}>
            <div className="border border-solid	border-gray-700 rounded-lg p-2 focus:border-red-900">
              <div className="flex items-center	text-base	break-words">
                <input
                  className="add-task__content border-none outline-none"
                  aria-label="Enter your task"
                  data-testid="add-task-content"
                  type="text"
                  placeholder="eg., watch Chelsea vs Manchester city"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>

              <textarea
                className="border-none mt-1.5 pt-px w-full text-md outline-none h-20"
                aria-invalid="false"
                aria-errormessage="a11y_task_description_over_limit"
                placeholder="Description"
                data-dashlane-rid="bbe2688572f1cc7c"
                data-form-type=""
                spellCheck="false"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`add-task__submit ${
                task ? 'opacity-100' : 'opacity-50'
              }`}
              data-testid="add-task"
              tabIndex="0"
              onClick={handleAddTask}
            >
              Add Task
            </button>
            {!showQuickAddTask && (
              <span
                className="add-task__cancel"
                data-testid="add-task-main-cancel"
                onClick={cancelAddTask}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    cancelAddTask();
                  }
                }}
                aria-label="Cancel adding a task"
                tabIndex={0}
                role="button"
              >
                Cancel
              </span>
            )}
          </form>
          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowProjectOverlay(!showProjectOverlay);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowTaskDate(!showTaskDate);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};
