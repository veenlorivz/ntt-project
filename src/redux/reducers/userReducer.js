const userStr = localStorage.getItem('currentUser');
const initialState = {
  currentUser: userStr ? JSON.parse(userStr) : null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, currentUser: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
