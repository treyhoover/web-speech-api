import {
  SET_MESSAGE_VOICE,
  SET_MESSAGE_TEXT
} from 'actions/messages';

const _messages = [
  {id: 1, voiceId: 66, rate: 1, pitch: 1, author: `Megan`, text: `Would you mind terribly putting the kettle on, I'm quite parched.`},
  {id: 2, voiceId: 16, rate: 1, pitch: 1, author: `Trey`, text: `Oh dear, I'm afraid I simply can't be bothered.`}
];

export default function messages(state = _messages, action) {
  let messageIndex, msg;

  switch (action.type) {
    case SET_MESSAGE_VOICE:
      messageIndex = state.findIndex(message => message.id === action.messageId);
      msg = {
        ..._messages[messageIndex],
        voiceId: action.voiceId
      };

      return state
        .slice(0, messageIndex)
        .concat(msg)
        .concat(state.slice(messageIndex + 1));
    case SET_MESSAGE_TEXT:
      messageIndex = state.findIndex(message => message.id === action.messageId);
      msg = {
        ..._messages[messageIndex],
        text: action.text
      };

      return state
        .slice(0, messageIndex)
        .concat(msg)
        .concat(state.slice(messageIndex + 1));
    default:
      return state;
  }
}