import { getCurrency } from '../services/currencyAPI';

export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';

export const login = (value) => ({
  type: 'LOGIN',
  data: value,
});

export const getCurrencies = (value) => ({
  type: 'GET_CURRENCIES',
  data: value,
});

export const setExpenses = (value) => ({
  type: 'SET_EXPENSES',
  data: value,
});

export const getCurrencyThunk = () => async (dispatch) => {
  const response = await getCurrency();
  const payload = response;
  dispatch(getCurrencies(payload));
};
