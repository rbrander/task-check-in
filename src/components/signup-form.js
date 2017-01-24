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
        <div className="ba dib pa2 ma2 tl">
          <div className="pv2">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={this.onNameChange} />
          </div>
          <div className="pv2">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.onEmailChange} />
          </div>
          <div className="pv2">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.onPasswordChange} />
          </div>
          <div className="pv2">
            <button type="submit">Signup</button>
          </div>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  signup: React.PropTypes.func.isRequired,
};

export default SignupForm;