import React, { Component, PropTypes } from 'react';

import Message from './message';
import './style.css';

class Conversation extends Component {
  render() {
    const { messages = [], playback = {}, voices = [], dispatch } = this.props;

    return (
      <div>
        <ul style={{ padding: '0px' }}>
          {messages.map(data => <Message
            key={data.id}
            data={data}
            dispatch={dispatch}
            playback={playback}
            voices={voices}
          />)}
        </ul>
      </div>
    );
  }
}

Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
  voices: PropTypes.array.isRequired,
  playback: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Conversation;
