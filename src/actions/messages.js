import { v4 as uuid } from 'node-uuid';

import { buildActions } from '../util';

const actionTypes = {
  set: {
    message: {
      voice: ({ id, voiceId, type }) => ({ id, voiceId, type }),
      text: ({ id, text, type }) => ({ id, text, type }),
      pitch: ({ id, pitch, type }) => ({ id, pitch, type }),
      rate: ({ id, rate, type }) => ({ id, rate, type }),
      author: ({ id, author, type }) => ({ id, author, type })
    }
  },
  create: {
    message: ({ id = uuid(), author = 'Anonymous', text = '', voiceId = 1, rate = 1, pitch = 1, type }) =>
      ({ id, author, text, voiceId, rate, pitch, type })
  },
  delete: {
    message: ({ id, type }) => ({ id, type }),
    all: { messages: ({ type }) => ({ type }) }
  },
  copy: {
    message: ({ id, type }) => ({ id, type })
  }
};

const actions = buildActions({}, actionTypes);

module.exports = actions;

// export const removeAllMessages = () => ({
//   type: 'DELETE_ALL_MESSAGES'
// });
//
// export const setMessageVoice = (id, voiceId) => ({
//   type: 'SET_MESSAGE_VOICE',
//   id,
//   voiceId
// });
//
// export const setMessageText = (id, text) => ({
//   type: 'SET_MESSAGE_TEXT',
//   id,
//   text
// });
//
// export const setMessageAuthor = (id, author) => ({
//   type: 'SET_MESSAGE_AUTHOR',
//   id,
//   author
// });
//
// export const setMessagePitch = (id, pitch) => ({
//   type: 'SET_MESSAGE_PITCH',
//   id,
//   pitch
// });
//
// export const setMessageRate = (id, rate) => ({
//   type: 'SET_MESSAGE_RATE',
//   id,
//   rate
// });
//
// export const createMessage = ({ author = 'Anonymous', text = '', voiceId = 0, rate = 1, pitch = 1 } = {}) => ({
//   type: 'CREATE_MESSAGE',
//   id: uuid(),
//   author,
//   text,
//   voiceId,
//   rate,
//   pitch
// });
//
// export const deleteMessage = ({ id }) => ({
//   type: 'DELETE_MESSAGE',
//   id
// });
//
// export const copyMessage = ({ id }) => ({
//   type: 'COPY_MESSAGE',
//   id
// });
//
// export const changeMessage = ({ id, key, value }) => {
//   // console.log('changing message', id, key, value);
//   const action = camelCase(`set message ${key}`);
//   if (typeof action === 'function') {
//     console.log('calling', action);
//   } else {
//     console.log('no action for', action);
//   }
// };
