import React, { Component } from 'react';
import './TableOfExpenses.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableItem from './TableItem';

class TableOfExpenses extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table className="expense-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <TableItem key={ expense.id } expense={ expense } />
          ))}
        </tbody>
      </table>
    );
  }
}

TableOfExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(TableOfExpenses);
