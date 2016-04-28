export const SET_MESSAGE_VOICE = 'SET_MESSAGE_VOICE';

export function setMessageVoice(messageId, voiceId) {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGE_VOICE,
      messageId,
      voiceId
    });
  };
}