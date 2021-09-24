import PropTypes from 'prop-types';
import { AiOutlineDelete } from 'react-icons/ai';

import app from '../firebase';

export const DeleteTask = ({ id, taskDesc }) => {
  const deleteTask = () => {
    app.firestore().collection('tasks').doc(id).delete();
  };

  return (
    <div aria-label={`Delete ${taskDesc}`} role="button">
      <AiOutlineDelete size={15} onClick={deleteTask} />
    </div>
  );
};

DeleteTask.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
