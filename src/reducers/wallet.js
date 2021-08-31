import { GET_CURRENCIES } from '../actions';

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
  default:
    return state;
  }
}

export default walletReducer;
