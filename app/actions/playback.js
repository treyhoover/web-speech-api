export const START_PLAYBACK  = 'START_PLAYBACK';
export const STOP_PLAYBACK  = 'STOP_PLAYBACK';
export const SET_CURRENTLY_PLAYING  = 'SET_CURRENTLY_PLAYING';

export function startPlayback() {
  return {type: START_PLAYBACK};
}

export function stopPlayback() {
  return {type: STOP_PLAYBACK};
}

export function setCurrentlyPlaying(message) {
  return {type: SET_CURRENTLY_PLAYING, message}
}