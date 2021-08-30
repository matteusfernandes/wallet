import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login as loginAction } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    const MIN_PASSWORD_LENGTH = 6;
    // regex tirado do site https://www.w3resource.com/javascript/form/email-validation.php;
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
    const { email, password } = this.state;
    const { login, history } = this.props;

    login({
      email,
      password,
    });
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container ">
        <div className="login-container">
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              placeholder="exemple@exemple.com"
              type="email"
              name="email"
              id="email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              placeholder="senha"
              type="password"
              name="password"
              id="password"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ email === '' || password === '' }
            onClick={ this.handleSubmmit }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
