import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    product: productReducer,
  }),
});
