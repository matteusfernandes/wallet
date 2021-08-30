import React, { Component } from 'react';
import './Login.css';
// regex tirado do site https://www.w3resource.com/javascript/form/email-validation.php;
const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }

  componentDidUpdate() {
    const { email, password } = this.state;

    if (email && password) {
      this.setState({
        btnDisable: false,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    const MIN_PASSWORD_LENGTH = 6;

    if (name === 'email' && value.match(mailFormat)) {
      this.setState({
        [name]: value,
      });
    }

    if (name === 'password' && value.length >= MIN_PASSWORD_LENGTH) {
      this.setState({
        [name]: value,
      });
    }
  }

  handleSubmmit() {

  }

  render() {
    const { btnDisable } = this.state;
    return (
      <div className="container ">
        <div className="login-container">
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="submit"
            disabled={ btnDisable }
            onClick={ this.handleSubmmit }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
