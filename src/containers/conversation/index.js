import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Conversation from '../../components/conversation';

const ConversationContainer = (props) => (
  <Conversation
    playback={props.playback}
    messages={props.messages}
    voices={props.voices}
    dispatch={props.dispatch}
  />
);

ConversationContainer.propTypes = {
  playback: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  voices: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { playback, messages, voices } = state;

  return {
    playback,
    messages,
    voices
  };
}

export default connect(mapStateToProps)(ConversationContainer);
