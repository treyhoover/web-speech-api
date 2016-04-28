import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import voices from 'reducers/voices';
import messages from 'reducers/messages';
import playback from 'reducers/playback';

const app = combineReducers({
  routing: routerReducer,
  voices,
  messages,
  playback
});

export default app;
