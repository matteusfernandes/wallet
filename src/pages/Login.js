import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { login as loginAction } from '../actions/index';
import loginLogo from '../assets/loginLogo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailIsValid: false,
      passwordIsValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    const MIN_PASSWORD_LENGTH = 6;
    // regex tirado do site https://www.w3resource.com/javascript/form/email-validation.php;
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailIsValid = mailFormat.test(value);
    const passwordIsValid = value.length >= MIN_PASSWORD_LENGTH;

    if (name === 'email') {
      this.setState({
        [name]: value,
        emailIsValid,
      });
    }

    if (name === 'password') {
      this.setState({
        [name]: value,
        passwordIsValid,
      });
    }
  }

  handleSubmmit() {
    const { email } = this.state;
    const { login, history } = this.props;

    login({
      email,
    });
    history.push('/carteira');
  }

  render() {
    const { email, password, emailIsValid, passwordIsValid } = this.state;
    return (
      <div className="container ">
        <div className="login-container">
          <img className="login-img" src={ loginLogo } alt="Logo da trybe" />

          <Input
            labelTitle="E-mail:"
            testId="email-input"
            placeholder="exemple@exemple.com"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />

          <Input
            labelTitle="Senha:"
            testId="password-input"
            placeholder="senha"
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.handleChange }
          />

          <button
            type="button"
            disabled={ !emailIsValid || !passwordIsValid }
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
