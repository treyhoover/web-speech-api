import {
  SET_MESSAGE_VOICE,
  SET_MESSAGE_TEXT,
  SET_MESSAGE_AUTHOR,
  SET_MESSAGE_RATE,
  SET_MESSAGE_PITCH,
  CREATE_MESSAGE,
  DELETE_MESSAGE
} from 'actions/messages';

import {setArrayIndexValue, removeArrayIndexValue} from 'reducers/helpers';

const SET_VALUE = 'SET_VALUE';

const _messages = [
  {id: 1, voiceId: 66, rate: 1, pitch: 1, author: `Megan`, text: `Would you mind terribly putting the kettle on, I'm quite parched.`},
  {id: 2, voiceId: 16, rate: 1, pitch: 1, author: `Trey`, text: `Oh dear, I'm afraid I simply can't be bothered.`}
];

function message (state, action) {
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
  let messageIndex, value;

  function updateMessageValue(messages, key, action) {
    messageIndex = messages.findIndex(message => message.id === action.messageId);
    value = message(messages[messageIndex], {type: SET_VALUE, key: key, value: action[key]});

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
      return updateMessageValue(state, 'rate', action);
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
      messageIndex = state.findIndex(message => message.id === action.id);
      return removeArrayIndexValue(state, messageIndex);
    default:
      return state;
  }
}