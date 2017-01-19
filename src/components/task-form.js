import React from 'react';

const TaskForm = () => {
  const today = new Date().toISOString();
  const startDate = today.substr(0, today.indexOf('T'));
  return (
    <div>
      <div>
        <span>Type: </span>
        <label><input type="radio" name="task-type" value="streak" /> Streak</label>
        <span> or </span>
        <label><input type="radio" name="task-type" value="completion" /> Completion</label>
      </div>
      <div>
        <span>Task Name: </span>
        <input type="text" name="task-name" />
      </div>
      <div>
        <span>Start Date: </span>
        <input type="date" name="task-start-date" defaultValue={startDate} />
      </div>
      <div>
        <span>End Date (optional): </span>
        <input type="date" name="task-end-date" />
      </div>
      <div>
        <span>Units: </span>
        <select name="task-units" defaultValue="days">
          <option value="hrs">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
      </div>
    </div>
  );
}

export default TaskForm;