import React from 'react';
import { Link } from 'react-router';

const TaskListItem = ({ task }) => (
  <tr data-id={ task.id }>
    <td>
      <Link to={`/task/view/${task._id}`} className="no-underline black">
        { task.name }
      </Link>
    </td>
    <td className="dn dtc-l">{ task.description }</td>
    <td>{ task.progress }</td>
    <td className="dn dtc-ns">{ task.startDate }</td>
    <td className="dn dtc-ns">{ task.endDate }</td>
    <td className="dn dtc-ns">{ task.goal }</td>
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