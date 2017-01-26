import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  tasks: state.Tasks.list,
});

const mapDispatchToProps = (dispatch) => ({
});

class TaskViewPage extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.array.isRequired,
  }

  render() {
    const { routeParams: { id }, tasks } = this.props;
    const foundTask = tasks.filter(task => task._id === id);
    if (foundTask.length === 0) {
      return (<div className="red">Error finding task</div>);
    }
    const task = foundTask[0];
    return (
      <div className="tc dib pa2 ma1">
        <div>Task View</div>
        <hr />
        <div className="tl">
          <div><strong>id:</strong> { task._id }</div>
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