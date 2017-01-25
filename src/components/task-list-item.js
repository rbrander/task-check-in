import React from 'react';

const TaskListItem = ({ task }) => (
  <tr data-id={ task.id }>
    <td>{ task.name }</td>
    <td>{ task.progress }</td>
    <td>{ task.startDate }</td>
    <td>{ task.endDate }</td>
  </tr>
);

TaskListItem.propTypes = {
  task: React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      progress: React.PropTypes.string,
      startDate: React.PropTypes.string,
      endDate: React.PropTypes.string,
    }).isRequired,
};

export default TaskListItem;