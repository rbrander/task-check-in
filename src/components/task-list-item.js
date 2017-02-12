import React from 'react';
import { Link } from 'react-router';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHovering: false };
  }

  static propTypes = {
    task: React.PropTypes.shape({
      _id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      progress: React.PropTypes.string,
      startDate: React.PropTypes.string,
      endDate: React.PropTypes.string,
      owner_id: React.PropTypes.string,
      completions: React.PropTypes.array,
    }).isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  getTaskURL = (taskID) => `/task/view/${taskID}`;
  setHover = (isHovering) => { this.setState({ isHovering }); };

  onMouseOver = () => { this.setHover(true); };
  onMouseOut = () => { this.setHover(false); };
  onClick = () => {
    const { router } = this.context;
    const { task: { _id } } = this.props;
    router.push(this.getTaskURL(_id));
  };

  render() {
    const { isHovering } = this.state;
    const { task } = this.props;
    const bgClass = isHovering ? 'bg-light-yellow' : '';
    return (
      <tr
        data-id={ task.id }
        className={ `pointer ${bgClass}` }
        onMouseOver={ this.onMouseOver }
        onMouseOut={ this.onMouseOut }
        onClick={ this.onClick }
      >
        <td>
          <Link to={`/task/view/${task._id}`} className="no-underline black">
            { task.name }
          </Link>
        </td>
        <td className="dn dtc-l">{ task.description }</td>
        <td>{ task.progress }</td>
        <td className="dn dtc-ns">{ task.startDate }</td>
        <td className="dn dtc-ns">{ task.endDate }</td>
        <td className="dn dtc-ns">{ task.goal }</td>
        <td>{ task.lastUpdated }</td>
      </tr>
    );
  }
}

export default TaskListItem;