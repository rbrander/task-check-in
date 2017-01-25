import React from 'react';
import { connect } from 'react-redux';
import TaskActions from '../actions/tasks';
import TaskList from '../components/task-list';

const mapStateToProps = (state) => ({
  tasks: state.Tasks.list,
  isPending: state.Tasks.isPending,
  hasError: (state.Tasks.error !== null && state.Tasks.error.length > 0),
});

const mapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(TaskActions.getTasks()),
});

class TasksPage extends React.Component {
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const { tasks, isPending, hasError } = this.props;
    return (
      <div>
        <h2>Tasks</h2>
        { isPending ? (<div>Loading...</div>) : 
          (hasError ? <div>Error loading tasks</div> : <TaskList tasks={ tasks } />) }
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  isPending: React.PropTypes.bool.isRequired,
  hasError: React.PropTypes.bool.isRequired,
  getTasks: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);