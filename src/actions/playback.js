import { buildActions, defaultAction } from '../util';

const actionTypes = {
  startPlayback: defaultAction,
  stopPlayback: defaultAction,
  setCurrentlyPlaying: ({ type, message }) => ({ type, message })
};

const actions = buildActions({}, actionTypes);

module.exports = actions;