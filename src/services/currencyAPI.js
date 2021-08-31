const CURRENCY_BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrency = () => (
  fetch(CURRENCY_BASE_URL)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrency;
