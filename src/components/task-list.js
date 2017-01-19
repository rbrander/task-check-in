import React from 'react';

const TaskList = ({ tasks }) => (
  <div>
    <div>TaskList</div>
  </div>
);

TaskList.propTypes = {
  tasks: React.PropTypes.array.isRequired,
};

export default TaskList;