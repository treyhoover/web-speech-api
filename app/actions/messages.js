export const SET_MESSAGE_VOICE = 'SET_MESSAGE_VOICE';
export const SET_MESSAGE_TEXT = 'SET_MESSAGE_TEXT';

export function setMessageVoice(messageId, voiceId) {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGE_VOICE,
      messageId,
      voiceId
    });
  };
}

export function setMessageText(messageId, text) {
  return {
    type: SET_MESSAGE_TEXT,
    messageId,
    text
  };
}