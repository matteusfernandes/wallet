import React, { Component } from 'react';
import PropTypes from 'prop-types';
import edit from '../assets/edit.png';
import remove from '../assets/remove.png';
import './TableItem.css';

class TableItem extends Component {
  render() {
    const {
      expense: {
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      } } = this.props;

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
            onClick=""
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

export default TableItem;
