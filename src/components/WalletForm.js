import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk, fetchExpensesThunk } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatchCurrencie } = this.props;
    dispatchCurrencie();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  clearImput = () => {
    this.setState({
      // id: prev.id + 1,
      value: '',
      description: '',
    });
  }

  saveExpense = () => {
    const { dispatchExpense, expenses } = this.props;
    console.log(expenses);
    this.setState((prev) => ({ id: prev.id + 1 }));
    dispatchExpense(this.state);
    this.clearImput();
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div>
        {currencies && (
          <>
            <form>
              <input
                type="number"
                name="value"
                value={ value }
                onChange={ this.handleChange }
                data-testid="value-input"
              />
              <input
                type="text"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                data-testid="description-input"
              />
              <select
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
                data-testid="currency-input"
              >
                {currencies.map((currencys) => (
                  <option key={ currencys }>
                    {currencys}
                  </option>
                ))}
              </select>
              <select
                name="method"
                value={ method }
                onChange={ this.handleChange }
                data-testid="method-input"
              >
                <option value="dinheiro">
                  Dinheiro
                </option>
                <option value="Cartão de crédito">
                  Cartão de crédito
                </option>
                <option value="Cartão de débito">
                  Cartão de débito
                </option>
              </select>
              <select
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
                data-testid="tag-input"
              >
                <option value="Alimentação">
                  Alimentação
                </option>
                <option value="Lazer">
                  Lazer
                </option>
                <option value="Trabalho">
                  Trabalho
                </option>
                <option value="Transporte">
                  Transporte
                </option>
                <option value="Saúde">
                  Saúde
                </option>
              </select>
            </form>
            <button
              type="button"
              onClick={ this.saveExpense }
            >
              Adicionar despesa
            </button>
          </>
        ) }

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencie: () => dispatch(fetchCurrenciesThunk()),
  dispatchExpense: (expense) => dispatch(fetchExpensesThunk(expense)),
});

WalletForm.propTypes = {
  dispatchCurrencie: PropTypes.func.isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(Array).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
