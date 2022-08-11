import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  // feito com a ajuda do Gelso Schwertz

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">
          { expenses.reduce((acc, curr) => (acc + parseFloat(curr.value)
            * parseFloat(curr.exchangeRates[curr.currency].ask)), 0).toFixed(2)}
        </span>
        <span data-testid="header-currency-field"> BRL </span>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
