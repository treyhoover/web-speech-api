import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Conversation from '../../components/conversation';
import { createMessage } from '../../actions/messages';

class ConversationContainer extends Component {
  onChange(id) {
    const { dispatch } = this.props;

    console.log('change');

    dispatch(createMessage({ text: 'test' }));
  }

  render() {
    const { playback, messages, voices } = this.props;

    return (
      <Conversation
        playback={playback}
        messages={messages}
        voices={voices}
        onChange={::this.onChange}
      />
    );
  }
}

ConversationContainer.propTypes = {
  playback: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  voices: PropTypes.array.isRequired
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