export const TOGGLE_PLAYING  = 'TOGGLE_PLAYING';

export function togglePlaying() {
  return (dispatch, getState) => {
    const {playback} = getState();
    const {isPlaying} = playback;
    dispatch({
      type: TOGGLE_PLAYING,
      isPlaying: !isPlaying
    });
  }
}