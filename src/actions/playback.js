import { buildActions, defaultAction } from '../util';

const actionTypes = {
  start: { playback: defaultAction },
  stop: { playback: defaultAction },
  set: {
    currently: {
      playing: ({ type, message }) => ({ type, message })
    }
  }
};

const actions = buildActions({}, actionTypes);

module.exports = actions;