import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/logo.png';
import wallet from '../assets/wallet.png';

class Wallet extends React.Component {
  sumTotalExpenses() {
    const { expenses } = this.props;

    return expenses.reduce((current, { value, currency, exchangeRates }) => {
      const convertedAmount = value * exchangeRates[currency].ask;

      return current + convertedAmount;
    }, 0);
  }

  render() {
    const { email } = this.props;

    const total = this.sumTotalExpenses();

    return (
      <header>
        <img className="trybe-logo" src={ logo } alt="Logo da trybe" />
        <div className="right-header-container">
          <div className="email-container">
            <img className="icon" src={ wallet } alt="Imagem de uma carteira" />
            <p>E-mail:</p>
            <div data-testid="email-field">{ email }</div>
          </div>
          <div className="expense-container">
            <p>Despesa Total:</p>
            <p data-testid="total-field">{ total.toFixed(2) }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Wallet);
