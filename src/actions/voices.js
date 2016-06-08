export const RECEIVE_VOICES = 'RECEIVE_VOICES';

export function receiveVoices() {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  return {
    type: RECEIVE_VOICES,
    voices
  };
}
