import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.props.signup(name, email, password);
  }

  onFieldChange = (field, value) => { this.setState({ [field]: value }); }
  onNameChange = (e) => { this.onFieldChange('name', e.target.value); }
  onEmailChange = (e) => { this.onFieldChange('email', e.target.value ); }
  onPasswordChange = (e) => { this.onFieldChange('password', e.target.value); }

  render() {
    const { name, email, password } = this.state;
    return (
      <form name="frmSignup" onSubmit={this.onSubmit}>
        <div className="pa1 mt1"><label htmlFor="txtName">Name</label></div>
        <div className="pa1 pt0">
          <input
            id="txtName"
            type="text"
            name="name"
            value={name}
            onChange={this.onNameChange}
            ref={(input) => { this.nameInput = input; }}
          />
        </div>
        <div className="pa1 mt1"><label htmlFor="txtEmail">Email</label></div>
        <div className="pa1 pt0">
          <input
            id="txtEmail"
            type="email"
            name="email"
            value={email}
            onChange={this.onEmailChange}
          />
        </div>
        <div className="pa1 mt1"><label htmlFor="txtPassword">Password</label></div>
        <div className="pa1 pt0">
          <input
            id="txtPassword"
            type="password"
            name="password"
            value={password}
            onChange={this.onPasswordChange}
          />
        </div>
        <div className="pa1 mt1"><button type="submit">Sign-up</button></div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  signup: React.PropTypes.func.isRequired,
};

export default SignupForm;