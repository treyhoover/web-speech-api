import {
  START_PLAYBACK,
  STOP_PLAYBACK,
} from 'actions/playback';

export default function playback(state = {
  isPlaying: false
}, action) {
  switch (action.type) {
    case START_PLAYBACK:
      return Object.assign({}, state, {
        ...state,
        isPlaying: true
      });
    case STOP_PLAYBACK:
      return Object.assign({}, state, {
        ...state,
        isPlaying: false
      });
    default:
      return state;
  }
}