import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

/**
 * @field auth Authentication reducer => Maintain authentication state
 * @field form Form reducer from redux-form library => Maintains form elements
 */
export default combineReducers({
  // TODO: Add the reducers here
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});
