import React from 'react';
import './Wallet.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Header from '../components/Header';
import Select from '../components/Select';
import { getCurrencyThunk, setExpensesThunk } from '../actions';

const PAYMENT_METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const INNITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: '',
  tag: '',
};

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = INNITIAL_STATE;

    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmmit = this.handleSubmmit.bind(this);
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

  handleSubmmit() {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, setExpenses } = this.props;

    setExpenses({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    });

    this.setState(INNITIAL_STATE);
  }

  renderInputs() {
    const { value, description } = this.state;

    return (
      <div>
        <Input
          labelTitle="Valor:"
          placeholder=""
          type="number"
          name="value"
          id="value"
          value={ value }
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
    const { currency, method, tag } = this.props;

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
          name="method"
          id="pay"
          value={ method }
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

          <button
            type="button"
            className="btn-submmit"
            onClick={ this.handleSubmmit }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrencyThunk()),
  setExpenses: (payload) => dispatch(setExpensesThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
