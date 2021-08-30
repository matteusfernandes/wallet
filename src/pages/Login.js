import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          <input type="email" name="email" data-testid="email-input" />
        </label>

        <label htmlFor="password">
          Senha:
          <input type="password" name="password" data-testid="password-input" />
        </label>
        <button type="submit">Entrar</button>
      </div>
    );
  }
}

export default Login;
