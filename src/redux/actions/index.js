// Coloque aqui suas actions
import getCurrencies from '../../api/getCurrencies';

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';

export const setUserName = (email) => ({
  type: 'SET_USER_NAME',
  payload: email,
});

export const setCurrencies = (currencies) => ({
  type: 'SET_CURRENCIES',
  payload: currencies,
});

export const setExpenses = (state, expense) => ({
  type: 'SET_EXPENSES',
  payload: { ...state, exchangeRates: expense },
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const data = await getCurrencies();
  const dataArr = Object.keys(data).filter((currency) => currency !== 'USDT');
  dispatch(setCurrencies(dataArr));
};
export const fetchExpensesThunk = (state) => async (dispatch) => {
  const data = await getCurrencies();
  dispatch(setExpenses(state, data));
  console.log(state);
};
