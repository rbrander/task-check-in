import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Calendar from '../components/calendar';
import TaskActions from '../actions/tasks';

const mapStateToProps = (state) => ({
  tasks: state.Tasks.list,  // used for mergeProps only
});

const mapDispatchToProps = (dispatch) => ({
  addCompletion: (task_id, date) => dispatch(TaskActions.addCompletion(task_id, date)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...dispatchProps,
  task: stateProps.tasks
    // Find the task by ID
    .filter(task => (task._id === ownProps.routeParams.id))
    // Convert each of the completion date strings into date objects
    .map(task => Object.assign({}, task, {
      completions: task.completions.map(dateStr => new Date(Date.parse(dateStr)))
    }))
    // Return only the first record
    .shift(),
});

class TaskViewPage extends React.Component {
  static propTypes = {
    task: React.PropTypes.object.isRequired,
    addCompletion: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    // Redirect to task list if task is not found
    if (this.props.task === undefined) {
      this.props.router.push('/tasks');
    }
  }

  onDayClick = (e, date) => {
    const { task, addCompletion } = this.props;
    addCompletion(task._id, date);
  }

  render() {
    const { task } = this.props;
    const now = new Date();
    const currMonth = now.getMonth() + 1;
    const currYear = now.getFullYear();
    return (
      <div className="tc dib">
        <div className="mt3 tl f6">
          <Link to="/tasks" className="link black">{ '\u25c4 Back to task list' }</Link>
        </div>
        <div className="f2 pb3">{ task.name }</div>
        <Calendar
          month={ currMonth }
          year={ currYear }
          completions={ task.completions }
          onDayClick={ this.onDayClick }
        />
        <div className="tl mv4">
          <div><strong>Name:</strong> { task.name }</div>
          <div><strong>Description:</strong> { task.description }</div>
          <div><strong>Progress:</strong> { task.progress }</div>
          <div><strong>Start Date:</strong> { task.startDate }</div>
          <div><strong>End Date:</strong> { task.endDate }</div>
          <div><strong>Completions:</strong>
            <ul>{task.completions.map(date => (
              <li key={ date.valueOf() }>
                { date.toString() }
              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskViewPage);