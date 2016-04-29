import {
  SET_MESSAGE_VOICE
} from 'actions/messages';

const _messages = [
  {id: 1, voiceId: 66, rate: 1, pitch: 1, author: `Megan`, text: `Would you mind terribly putting the kettle on, I'm quite parched.`},
  {id: 2, voiceId: 16, rate: 1, pitch: 1, author: `Trey`, text: `Oh dear, I'm afraid I simply can't be bothered.`}
];

export default function messages(state = _messages, action) {
  switch (action.type) {
    case SET_MESSAGE_VOICE:
      const {messageId, voiceId} = action;
      const messageIndex = state.findIndex(message => message.id === messageId);
      const msg = {
        ..._messages[messageIndex],
        voiceId
      };

      return state
        .slice(0, messageIndex)
        .concat(msg)
        .concat(state.slice(messageIndex + 1));

    default:
      return state;
  }
}