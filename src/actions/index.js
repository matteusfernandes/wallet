import { getCurrency } from '../services/currencyAPI';

const ACTIONS = {
  LOGIN: 'LOGIN',
  GET_CURRENCIES: 'GET_CURRENCIES',
};

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const login = (value) => ({
  type: 'LOGIN',
  data: value,
});

export const getCurrencies = (value) => ({
  type: 'GET_CURRENCIES',
  data: value,
});

export const getCurrencyThunk = () => async (dispatch) => {
  const response = await getCurrency();
  const payload = response;
  dispatch(getCurrencies(payload));
};

export default ACTIONS;
