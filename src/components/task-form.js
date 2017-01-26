import React from 'react';

class TaskForm extends React.Component {
  static propTypes = {
    createTask: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const startDate = this.formatDatePicker(new Date());
    this.state = {
      name: '',
      description: '',
      progress: 'not yet started',
      startDate: startDate,
      endDate: '',
    };
  }

  formatDatePicker = (dateObj) => {
    // input: date object, output: string formatted "YYYY-MM-D"
    // TODO: create a zero pad function
    return `${dateObj.getFullYear()}-${('00' + (dateObj.getMonth() + 1)).substr(-2)}-${('00' + dateObj.getDate()).substr(-2)}`
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createTask(this.state);
  }
  onFieldChange = (fieldname, value) => this.setState({ [fieldname]: value })
  onNameChange = (e) => this.onFieldChange('name', e.target.value)
  onDescriptionChange = (e) => this.onFieldChange('description', e.target.value)
  onProgressChange = (e) => this.onFieldChange('progress', e.target.value)
  onStartDateChange = (e) => this.onFieldChange('startDate', e.target.value)
  onEndDateChange = (e) => this.onFieldChange('endDate', e.target.value)

  render() {
    const { name, description, progress, startDate, endDate } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="pa1 mt1"><label htmlFor="txtName">Name</label></div>
        <div className="pa1 pt0">
          <input
            id="txtName"
            type="text"
            name="name"
            value={ name }
            onChange={ this.onNameChange }
            ref={ (input) => { this.nameInput = input; } }
          />
        </div>
        <div className="pa1 mt1"><label htmlFor="txtDescription">Description</label></div>
        <div className="pa1 pt0">
          <input
            id="txtDescription"
            type="text"
            name="description"
            value={ description }
            onChange={ this.onDescriptionChange }
          />
        </div>
        <div className="pa1 mt1"><label htmlFor="txtProgress">Progress</label></div>
        <div className="pa1 pt0">
          <input
            id="txtProgress"
            type="text"
            name="progress"
            value={ progress }
            onChange={ this.onProgressChange }
          />
        </div>
        <div className="pa1 mt1"><label htmlFor="txtStartDate">Start Date</label></div>
        <div className="pa1 pt0">
          <input
            id="txtStartDate"
            type="date"
            name="startDate"
            value={ startDate }
            onChange={ this.onStartDateChange }
          />
        </div>
        <div className="pa1 mt1"><label htmlFor="txtEndDate">End Date</label></div>
        <div className="pa1 pt0">
          <input
            id="txtEndDate"
            type="date"
            name="endDate"
            value={ endDate }
            onChange={ this.onEndDateChange }
          />
        </div>
        <div className="pa1 mt1"><button type="submit">Create Task</button></div>
      </form>
    );
  };
}

export default TaskForm;