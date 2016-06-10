import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Conversation from '../../components/conversation';

class ConversationContainer extends Component {
  render() {
    const { playback, messages, voices, dispatch } = this.props;

    return (
      <Conversation
        playback={playback}
        messages={messages}
        voices={voices}
        dispatch={dispatch}
      />
    );
  }
}

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