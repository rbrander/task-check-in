import React from 'react';
import { Link } from 'react-router';

const TaskListItem = ({ task }) => (
  <tr data-id={ task.id }>
    <td><Link to={`/task/view/${task._id}`}>{ task.name }</Link></td>
    <td>{ task.description }</td>
    <td>{ task.progress }</td>
    <td>{ task.startDate }</td>
    <td>{ task.endDate }</td>
    <td>{ task.lastUpdated }</td>
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