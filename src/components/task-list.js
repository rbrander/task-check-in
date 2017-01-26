import React from 'react';
import TaskListItem from './task-list-item';

const TaskList = ({ tasks }) => (
  <div className="mv3 pa2 dib tl">
    <table cellSpacing="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Progress</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        { tasks.length > 0 ? (
            tasks.map(task =>
              <TaskListItem
                key={ task._id }
                task={ task }
              />
            )
          ) : (
            <tr>
              <td colSpan="4" className="tc">
                There are no tasks
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  </div>
);

TaskList.propTypes = {
  tasks: React.PropTypes.array.isRequired,
};

export default TaskList;