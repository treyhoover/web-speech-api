import {
  SET_MESSAGE_VOICE
} from 'actions/messages';

const _messages = [
  {id: 1, voiceId: 1, rate: 1, pitch: 1, author: `Trey`, text: `This is pretty awesome!`},
  {id: 2, voiceId: 1, rate: 1, pitch: 1, author: `Megan`, text: `I know, right?`},
  {id: 3, voiceId: 1, rate: 1, pitch: 1, author: `Trey`, text: `Aw yeahh.`}
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