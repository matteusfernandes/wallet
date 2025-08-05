import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import edit from '../assets/edit.png';
import remove from '../assets/remove.png';
import { removeExpenses as removeExpenseAction } from '../actions';
import './TableItem.css';

class TableItem extends Component {
  render() {
    const { expense, removeExpense } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = expense;

    const [currencyName] = exchangeRates[currency].name.split('/');
    const { ask } = exchangeRates[currency];
    const correctAsk = Number(ask).toFixed(2);
    const convertedValue = (value * ask).toFixed(2);

    return (
      <tr className="line">
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyName }</td>
        <td>{ correctAsk }</td>
        <td>{ convertedValue }</td>
        <td>Real</td>
        <td>
          <button
            className="btn"
            type="button"
            data-testid="edit-btn"
            onClick=""
          >
            <img className="icon" src={ edit } alt="Botão de editar" />
          </button>
          <button
            className="btn"
            type="button"
            data-testid="delete-btn"
            onClick={ () => removeExpense(expense) }
          >
            <img className="icon" src={ remove } alt="Botão de remover" />
          </button>
        </td>
      </tr>
    );
  }
}

TableItem.propTypes = {
  expense: PropTypes.objectOf(PropTypes.any),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
});

export default connect(null, mapDispatchToProps)(TableItem);
