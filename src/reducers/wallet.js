import { GET_CURRENCIES, SET_EXPENSES, REMOVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };

  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };

  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.data.id,
      ),
    };

  default:
    return state;
  }
}

export default walletReducer;
