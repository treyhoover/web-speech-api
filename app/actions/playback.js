export const START_PLAYBACK  = 'START_PLAYBACK';
export const STOP_PLAYBACK  = 'STOP_PLAYBACK';

export function startPlayback() {
  console.log('creating start action');
  return dispatch => {
    dispatch({type: START_PLAYBACK});
  }
}

export function stopPlayback() {
  console.log('creating start action');
  return dispatch => {
    dispatch({type: STOP_PLAYBACK});
  }
}