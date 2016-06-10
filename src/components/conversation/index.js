import React, { Component, PropTypes } from 'react';

import Message from './message';
import './style.css';

class Conversation extends Component {
  onChange(id, key, value) {
    this.props.onChange({ id, key, value });
  }

  render() {
    const { messages = [], playback = {}, voices = [] } = this.props;

    return (
      <div>
        <ul style={{ padding: '0px' }}>
          {messages.map(data => <Message
            key={data.id}
            data={data}
            playback={playback}
            voices={voices}
            onChange={::this.onChange}
          />)}
        </ul>
      </div>
    );
  }
}

Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  voices: PropTypes.array.isRequired,
  playback: PropTypes.object.isRequired
};

export default Conversation;
