import React from 'react';
import { connect } from 'react-redux';
import Calendar from '../components/calendar';
import TaskActions from '../actions/tasks';

const mapStateToProps = (state) => ({
  tasks: state.Tasks.list,
});

const mapDispatchToProps = (dispatch) => ({
  addCompletion: (task_id, date) => dispatch(TaskActions.addCompletion(task_id, date)),
});

class TaskViewPage extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
    addCompletion: React.PropTypes.func.isRequired,
  }

  render() {
    const { routeParams: { id }, tasks } = this.props;
    const foundTask = tasks.filter(task => task._id === id);
    if (foundTask.length === 0) {
      return (<div className="red">Error finding task</div>);
    }
    const task = foundTask[0];
    const now = new Date();
    const currMonth = now.getMonth() + 1;
    const currYear = now.getFullYear();
    return (
      <div className="tc dib">
        <div className="f2 pa3">{ task.name }</div>
        <Calendar month={ currMonth } year={ currYear } />
        <div className="tl mv4">
          <div><strong>Name:</strong> { task.name }</div>
          <div><strong>Description:</strong> { task.description }</div>
          <div><strong>Progress:</strong> { task.progress }</div>
          <div><strong>Start Date:</strong> { task.startDate }</div>
          <div><strong>End Date:</strong> { task.endDate }</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskViewPage);