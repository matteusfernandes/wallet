const ACTIONS = {
  LOGIN: 'LOGIN',
};

export const login = (value) => ({
  type: 'LOGIN',
  data: value,
});

export default ACTIONS;
