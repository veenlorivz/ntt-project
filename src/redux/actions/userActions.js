import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const logout = () => {
  cookies.remove('access_token', { path: '/' });
  localStorage.removeItem('currentUser');
  return { type: 'LOGOUT' };
};

export const setUser = (user) => ({ type: 'SET_USER', payload: user });

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await axios.post('https://dummyjson.com/user/login', credentials);
    cookies.set('access_token', response.data.accessToken, { path: '/' });
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response.data;
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Login failed';
    dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
    throw new Error(errorMsg);
  }
};
