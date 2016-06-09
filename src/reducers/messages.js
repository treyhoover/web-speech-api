import { v4 as uuid } from 'node-uuid';

import {
  SET_MESSAGE_VOICE,
  SET_MESSAGE_TEXT,
  SET_MESSAGE_AUTHOR,
  SET_MESSAGE_RATE,
  SET_MESSAGE_PITCH,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  COPY_MESSAGE
} from '../actions/messages';
import { reject } from 'lodash';

import { setArrayIndexValue } from './helpers';

const SET_VALUE = 'SET_VALUE';

const _messages = [
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
  const copy = Object.assign({}, state[idx], {id: uuid()});

  return [
    ...state.slice(0, idx),
    state[idx],
    copy,
    ...state.slice(idx + 1, state.length)
  ];
}

function message(state, action) {
  switch (action.type) {
    case SET_VALUE:
      return {
        ...state,
        [action.key]: action.value
      };
    default:
      return state;
  }
}

export default function messages(state = _messages, action) {
  function updateMessageValue(m, key, updateAction) {
    const messageIndex = m.findIndex(msg => msg.id === updateAction.messageId);
    const value = message(m[messageIndex], { type: SET_VALUE, key, value: updateAction[key] });

    return setArrayIndexValue(state, messageIndex, value);
  }

  switch (action.type) {
    case SET_MESSAGE_VOICE:
      return updateMessageValue(state, 'voiceId', action);
    case SET_MESSAGE_TEXT:
      return updateMessageValue(state, 'text', action);
    case SET_MESSAGE_RATE:
      return updateMessageValue(state, 'rate', action);
    case SET_MESSAGE_PITCH:
      return updateMessageValue(state, 'pitch', action);
    case SET_MESSAGE_AUTHOR:
      return updateMessageValue(state, 'author', action);
    case CREATE_MESSAGE:
      return state.concat({
        id: action.id,
        voiceId: 0,
        rate: 1,
        pitch: 1,
        author: 'Anonymous',
        text: ''
      });
    case DELETE_MESSAGE:
      return reject(state, m => m.id === action.id);
    case COPY_MESSAGE:
      return duplicated(state, action.id);
    default:
      return state;
  }
}
