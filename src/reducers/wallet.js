import { GET_CURRENCIES, SET_EXPENSES } from '../actions';

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

  default:
    return state;
  }
}

export default walletReducer;
