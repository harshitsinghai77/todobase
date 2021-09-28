/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';

import app from '../firebase';
import { collatedTasksExist } from '../helpers';
import { useAuth } from '../context/authContext';
import { partitionFilter } from '../helpers';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe =
      currentUser &&
      app
        .firestore()
        .collection('tasks')
        .where('userId', '==', currentUser.uid)
        .orderBy('createdAt', 'asc');

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      const [completedTasks, pendingTasks] = partitionFilter(
        newTasks,
        (e) => e.archived === true
      );

      setTasks(
        selectedProject === 'NEXT_7'
          ? pendingTasks.filter(
              (task) =>
                (moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7) &
                (task.projectId !== 'TODAY')
            )
          : pendingTasks
      );

      setArchivedTasks(
        completedTasks.reverse() // reverse to get the last item on top
      );
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;
    app
      .firestore()
      .collection('projects')
      .where('userId', '==', currentUser.uid)
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
