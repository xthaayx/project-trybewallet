import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions/index';

class Table extends Component {
  render() {
    const { expenses, dispatchDelete } = this.props;
    return (
      <>
        {/* <div>Table</div> */}
        <table>
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
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>
                  { expense.description }
                </td>
                <td>
                  { expense.tag }
                </td>
                <td>
                  { expense.method }
                </td>
                <td>
                  { Number(expense.value).toFixed(2) }
                </td>
                <td>
                  { expense.exchangeRates[(expense.currency)].name }
                </td>
                <td>
                  { Number(expense.exchangeRates[(expense.currency)].ask).toFixed(2) }
                </td>
                <td>
                  { Number(expense.value
                    * expense.exchangeRates[(expense.currency)].ask).toFixed(2) }
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatchDelete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDelete: (expense) => dispatch(deleteExpenses(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatchDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
