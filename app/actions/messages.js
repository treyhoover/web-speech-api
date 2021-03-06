export const SET_MESSAGE_VOICE = 'SET_MESSAGE_VOICE';
export const SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT';
export const SET_MESSAGE_PITCH = 'SET_MESSAGE_PITCH';
export const SET_MESSAGE_RATE = 'SET_MESSAGE_RATE';
export const SET_MESSAGE_AUTHOR = 'SET_MESSAGE_AUTHOR';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export function setMessageVoice(messageId, voiceId) {
  return {
    type: SET_MESSAGE_VOICE,
    messageId,
    voiceId
  };
}

export function setMessageText(messageId, text) {
  return {
    type: SET_MESSAGE_TEXT,
    messageId,
    text
  };
}

export function setMessageAuthor(messageId, author) {
  return {
    type: SET_MESSAGE_AUTHOR,
    messageId,
    author
  };
}

export function setMessagePitch(messageId, pitch) {
  return {
    type: SET_MESSAGE_PITCH,
    messageId,
    pitch
  };
}

export function setMessageRate(messageId, rate) {
  return {
    type: SET_MESSAGE_RATE,
    messageId,
    rate
  };
}

export function createMessage({id, author, text, voiceId, rate, pitch}) {
  return {
    type: CREATE_MESSAGE,
    id,
    author,
    text,
    voiceId,
    rate,
    pitch
  }
}

export function deleteMessage({id}) {
  return {
    type: DELETE_MESSAGE,
    id
  }
}