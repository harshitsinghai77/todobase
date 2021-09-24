import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

import app from '../firebase';

export const DeleteTask = ({ id, taskDesc }) => {
  const deleteTask = () => {
    app.firestore().collection('tasks').doc(id).delete();
  };

  return (
    <div aria-label={`Delete ${taskDesc}`} role="button">
      <FaTrashAlt size={15} onClick={deleteTask} color="#cacaca" />
    </div>
  );
};

DeleteTask.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
