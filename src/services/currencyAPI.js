const CURRENCY_BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrency = async () => {
  const response = await fetch(CURRENCY_BASE_URL);
  const data = await response.json();

  return (
    Object.keys(data).filter((currency) => currency !== 'USDT')
  );
};

export default getCurrency;
