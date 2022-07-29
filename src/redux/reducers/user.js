// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_USER_NAME':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReducer;
