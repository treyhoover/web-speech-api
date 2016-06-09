import { v4 as uuid } from 'node-uuid';
import { reject } from 'lodash';

import {
  SET_MESSAGE_VOICE,
  SET_MESSAGE_TEXT,
  SET_MESSAGE_AUTHOR,
  SET_MESSAGE_RATE,
  SET_MESSAGE_PITCH,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  COPY_MESSAGE,
  REMOVE_ALL_MESSAGES
} from '../actions/messages';

import { loadState } from '../models/localstorage';

const restoredState = loadState() || {};

const _messages = restoredState.messages || [
  {
    id: uuid(), voiceId: 66, rate: 1, pitch: 1, author: 'Megan',
    text: 'Would you mind terribly putting the kettle on, I\'m quite parched.'
  },
  {
    id: uuid(), voiceId: 16, rate: 1, pitch: 1, author: 'Trey',
    text: 'Oh dear, I\'m afraid I simply can\'t be bothered.'
  }
];



function duplicated(state, id) {
  const idx = state.findIndex(message => message.id === id);
  const copy = Object.assign({}, state[idx], { id: uuid() });

  return [
    ...state.slice(0, idx),
    state[idx],
    copy,
    ...state.slice(idx + 1, state.length)
  ];
}

function updated(state, id, transform) {
  const idx = state.findIndex(message => message.id === id);

  return [
    ...state.slice(0, idx),
    transform(state[idx]),
    ...state.slice(idx + 1, state.length)
  ];
}

export default function messages(state = _messages, action) {
  switch (action.type) {
    case SET_MESSAGE_VOICE:
      return updated(state, action.id, m => ({ ...m, voiceId: action.voiceId }));
    case SET_MESSAGE_TEXT:
      return updated(state, action.id, m => ({ ...m, text: action.text }));
    case SET_MESSAGE_RATE:
      return updated(state, action.id, m => ({ ...m, rate: action.rate }));
    case SET_MESSAGE_PITCH:
      return updated(state, action.id, m => ({ ...m, pitch: action.pitch }));
    case SET_MESSAGE_AUTHOR:
      return updated(state, action.id, m => ({ ...m, author: action.author }));
    case CREATE_MESSAGE:
      return state.concat({
        id: action.id,
        voiceId: action.voiceId,
        rate: action.rate,
        pitch: action.pitch,
        author: action.author,
        text: action.text
      });
    case DELETE_MESSAGE:
      return reject(state, m => m.id === action.id);
    case COPY_MESSAGE:
      return duplicated(state, action.id);
    case REMOVE_ALL_MESSAGES:
      return [];
    default:
      return state;
  }
}
