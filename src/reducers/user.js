const INITIAL_STATE = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.data.email,
      password: action.data.password,
    };
  default:
    return state;
  }
}

export default userReducer;
