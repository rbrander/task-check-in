import React from 'react';
import { connect } from 'react-redux';
import TaskForm from '../components/task-form';
import TaskActions from '../actions/tasks';

const mapStateToProps = (state) => ({
  hasError: !!state.Tasks.error,
  newTask: state.Tasks.newTask,
});

const mapDispatchToProps = (dispatch) => ({
  createTask: (task) => dispatch(TaskActions.createTask(task)),
});

class TaskCreatePage extends React.Component {
  static propTypes = {
    hasError: React.PropTypes.bool.isRequired,
    createTask: React.PropTypes.func.isRequired,
    newTask: React.PropTypes.object.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    // Redirect user to the task list upon successful creation of a new task
    const hasNewTask = (
      (Object.keys(this.props.newTask).length === 0) &&
      (Object.keys(nextProps.newTask).length > 0)
    );
    if (hasNewTask) {
      this.props.router.push('/tasks');
    }
  }
  render() {
    const { createTask, hasError } = this.props;
    return (
      <div>
        <div className="tl dib pa2 ba shadow-4">
          <div className="f3 mb2">Create Task</div>
          { hasError ? (
            <div className="red">
              Error creating task
            </div>
            ) : null
          }
          <TaskForm createTask={ createTask } />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreatePage);