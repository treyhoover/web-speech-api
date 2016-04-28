import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import voices from 'reducers/voices';
import messages from 'reducers/messages';

const app = combineReducers({
  routing: routerReducer,
  voices,
  messages
});

export default app;
