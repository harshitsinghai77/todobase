import { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { AddTask } from './AddTask';
import { DeleteTask } from './DeleteTask';
import { useTasks } from '../hooks';
import { collatedTasks, APP_NAME } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);
  let projectName = '';

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: ${APP_NAME}`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <div className="flex-space-between">
              <div className="checkbox-and-task-name">
                <Checkbox id={task.id} taskDesc={task.task} />
                <span>{task.task}</span>
              </div>
              <DeleteTask id={task.id} taskDesc={task.task} />
            </div>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};
