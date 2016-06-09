import { v4 as uuid } from 'node-uuid';

export const SET_MESSAGE_VOICE = 'SET_MESSAGE_VOICE';
export const SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT';
export const SET_MESSAGE_PITCH = 'SET_MESSAGE_PITCH';
export const SET_MESSAGE_RATE = 'SET_MESSAGE_RATE';
export const SET_MESSAGE_AUTHOR = 'SET_MESSAGE_AUTHOR';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const COPY_MESSAGE = 'COPY_MESSAGE';
export const REMOVE_ALL_MESSAGES = 'REMOVE_ALL_MESSAGES';

export const removeAllMessages = () => ({
  type: REMOVE_ALL_MESSAGES
});

export const setMessageVoice = (id, voiceId) => ({
  type: SET_MESSAGE_VOICE,
  id,
  voiceId
});

export const setMessageText = (id, text) => ({
  type: SET_MESSAGE_TEXT,
  id,
  text

});

export const setMessageAuthor = (id, author) => ({
  type: SET_MESSAGE_AUTHOR,
  id,
  author
});

export const setMessagePitch = (id, pitch) => ({
  type: SET_MESSAGE_PITCH,
  id,
  pitch

});

export const setMessageRate = (id, rate) => ({
  type: SET_MESSAGE_RATE,
  id,
  rate
});

export const createMessage = ({ author = 'Anonymous', text = '', voiceId = 0, rate = 1, pitch = 1 } = {}) => ({
  type: CREATE_MESSAGE,
  id: uuid(),
  author,
  text,
  voiceId,
  rate,
  pitch
});

export const deleteMessage = ({ id }) => ({
  type: DELETE_MESSAGE,
  id
});

export const copyMessage = ({ id }) => ({
  type: COPY_MESSAGE,
  id
});
