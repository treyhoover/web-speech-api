import {
  TOGGLE_PLAYING
} from 'actions/playback';

export default function playback(state = {
  isPlaying: false
}, action) {
  switch (action.type) {
    case TOGGLE_PLAYING:
      return Object.assign({}, state, {
        ...state,
        isPlaying: action.isPlaying
      });
    default:
      return state;
  }
}