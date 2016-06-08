import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import voices from './voices';
import messages from './messages';
import playback from './playback';

const app = combineReducers({
  routing: routerReducer,
  voices,
  messages,
  playback
});

export default app;
