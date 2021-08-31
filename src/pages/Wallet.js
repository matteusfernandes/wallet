import React from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Header from '../components/Header';
import Select from '../components/Select';
import { getCurrencyThunk } from '../actions';

const PAYMENT_METHODS = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseAmount: 0,
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;

    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  renderInputs() {
    const { expenseAmount, description } = this.state;

    return (
      <div>
        <Input
          labelTitle="Valor:"
          placeholder=""
          type="number"
          name="expenseAmount"
          id="expenseAmount"
          value={ expenseAmount }
          onChange={ this.handleChange }
        />

        <Input
          labelTitle="Descrição:"
          placeholder=""
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </div>
    );
  }

  renderSelects() {
    const { currencies } = this.props;
    const { currency, payment, tag } = this.props;

    return (
      <div>
        <Select
          labelTitle="Moeda:"
          name="currency"
          id="moeda"
          value={ currency }
          onChange={ this.handleChange }
          options={ currencies }
        />

        <Select
          labelTitle="Método de Pagamento:"
          name="payment"
          id="pay"
          value={ payment }
          onChange={ this.handleChange }
          options={ PAYMENT_METHODS }
        />

        <Select
          labelTitle="Tag:"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
          options={ TAGS }
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <form>
          {this.renderInputs()}
          {this.renderSelects()}
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrencyThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
