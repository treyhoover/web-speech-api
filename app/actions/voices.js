export const RECEIVE_VOICES = 'RECEIVE_VOICES';

function _receiveVoices() {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  return (dispatch) => {
    dispatch({
      type: RECEIVE_VOICES,
      voices
    });
  };
}

export function populateVoices() {
  return (dispatch) => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = function () {
        dispatch(_receiveVoices());
      };
    }
  };
}