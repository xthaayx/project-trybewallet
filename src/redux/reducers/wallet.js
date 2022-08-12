// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_CURRENCIES, SET_EXPENSES, DELETE_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case SET_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.payload),
    };
  default:
    return state;
  }
};

export default walletReducer;
