import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatchCurrencie } = this.props;
    dispatchCurrencie();
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        {currencies && (
          <form>
            <input
              type="number"
              data-testid="value-input"
            />
            <input
              type="text"
              data-testid="description-input"
            />
            <select data-testid="currency-input">
              {currencies.map((currency) => (
                <option key={ currency }>
                  {currency}
                </option>
              ))}
            </select>
            <select data-testid="method-input">
              <option value="dinheiro">
                Dinheiro
              </option>
              <option value="credito">
                Cartão de crédito
              </option>
              <option value="debito">
                Cartão de débito
              </option>
            </select>
            <select data-testid="tag-input">
              <option value="alimentacao">
                Alimentação
              </option>
              <option value="lazer">
                Lazer
              </option>
              <option value="trabalho">
                Trabalho
              </option>
              <option value="transporte">
                Transporte
              </option>
              <option value="saude">
                Saúde
              </option>
            </select>
          </form>
        ) }

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencie: () => dispatch(fetchCurrenciesThunk()),
});

WalletForm.propTypes = {
  dispatchCurrencie: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
