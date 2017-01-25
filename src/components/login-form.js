import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }
  onFieldChange = (fieldname, value) => this.setState({ [fieldname]: value })
  onEmailChange = (e) => this.onFieldChange('email', e.target.value)
  onPasswordChange = (e) => this.onFieldChange('password', e.target.value)

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="pa1 mt1"><label>E-mail</label></div>
        <div className="pa1 pt0">
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.onEmailChange}
            ref={(input) => { this.emailInput = input; }}
          />
        </div>
        <div className="pa1 mt1"><label>Password</label></div>
        <div className="pa1 pt0">
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.onPasswordChange}
          />
        </div>
        <div className="pa1 mt1"><button type="submit">Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
};

export default LoginForm;