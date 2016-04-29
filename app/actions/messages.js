export const SET_MESSAGE_VOICE = 'SET_MESSAGE_VOICE';
export const SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT';
export const SET_MESSAGE_PITCH = 'SET_MESSAGE_PITCH';
export const SET_MESSAGE_RATE = 'SET_MESSAGE_RATE';

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