export default function playback(state = {
  isPlaying: false
}, action) {
  switch (action.type) {
    case 'START_PLAYBACK':
      return Object.assign({}, state, {
        ...state,
        isPlaying: true
      });
    case 'STOP_PLAYBACK':
      return Object.assign({}, state, {
        ...state,
        isPlaying: false
      });
    case 'SET_CURRENTLY_PLAYING':
      return Object.assign({}, state, {
        ...state,
        currentlyPlaying: action.currentlyPlaying
      });
    default:
      return state;
  }
}
