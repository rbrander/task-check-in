import React from 'react';

const Task = ({ id, name }) => (
  <div>
    Task { id }: { name }
  </div>
);

Task.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
};

export default Task;