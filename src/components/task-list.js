import React from 'react';
import Task from './task';

const TaskList = ({ tasks }) => (
  <div>
    <div>Task List</div>
    { tasks.map(task => <Task key={ task.id } id={ task.id } name={ task.name } />) }
  </div>
);

TaskList.propTypes = {
  tasks: React.PropTypes.array.isRequired,
};

export default TaskList;