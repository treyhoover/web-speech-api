import {
  RECEIVE_VOICES
} from 'actions/voices';

export default function voices(state = {}, action) {
  switch (action.type) {
    case RECEIVE_VOICES:
      return action.voices;
    default:
      return state;
  }
}