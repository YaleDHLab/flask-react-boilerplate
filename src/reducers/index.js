import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import itemReducer from './itemReducer';

export const rootReducer = combineReducers({
  form: formReducer,
  items: itemReducer
});