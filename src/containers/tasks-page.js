import React from 'react';
import { connect } from 'react-redux';
import TaskActions from '../actions/tasks';
import TaskList from '../components/task-list';
import TaskForm from '../components/task-form';

const mapStateToProps = (state) => ({
  tasks: state.Tasks.list,
  isPending: state.Tasks.isPending,
  isLoggedIn: (state.User.email.length > 0),
  hasError: (state.Tasks.error !== null && state.Tasks.error.length > 0),
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(TaskActions.getTasks()),
  createTask: (task) => dispatch(TaskActions.createTask(task)),
});

class TasksPage extends React.Component {
  componentWillMount() {
    if (!this.props.isLoggedIn)
      this.props.router.push('/login');
  }

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const { tasks, isPending, hasError, createTask } = this.props;
    return (
      <div>
        <h2>Tasks</h2>
        { isPending ? (<div>Loading...</div>) :
          (hasError ? (<div>Error loading tasks</div>) : <TaskList tasks={ tasks } />)
        }
        <div>
          <TaskForm onSubmit={ createTask } />
        </div>
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  isPending: React.PropTypes.bool.isRequired,
  hasError: React.PropTypes.bool.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  getTasks: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);