export const SET_MESSAGE_VOICE = 'SET_MESSAGE_VOICE';
export const SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT';
export const SET_MESSAGE_PITCH = 'SET_MESSAGE_PITCH';
export const SET_MESSAGE_RATE = 'SET_MESSAGE_RATE';
export const SET_MESSAGE_AUTHOR = 'SET_MESSAGE_AUTHOR';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const setMessageVoice = (messageId, voiceId) => ({
  type: SET_MESSAGE_VOICE,
  messageId,
  voiceId
});

export const setMessageText = (messageId, text) => ({
  type: SET_MESSAGE_TEXT,
  messageId,
  text

});

export const setMessageAuthor = (messageId, author) => ({
  type: SET_MESSAGE_AUTHOR,
  messageId,
  author

});

export const setMessagePitch = (messageId, pitch) => ({
  type: SET_MESSAGE_PITCH,
  messageId,
  pitch

});

export const setMessageRate = (messageId, rate) => ({
  type: SET_MESSAGE_RATE,
  messageId,
  rate
});

export const createMessage = ({ id, author, text, voiceId, rate, pitch }) => ({
  type: CREATE_MESSAGE,
  id,
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
