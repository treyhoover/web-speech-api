import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import App from '../../components/app';
import ConversationActions from '../../components/conversation-actions';
import Conversation from '../conversation';
import { receiveVoices } from '../../actions/voices';
import { createMessage } from '../../actions/messages';
import { startPlayback, stopPlayback, setCurrentlyPlaying } from '../../actions/playback';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Root extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    speechSynthesis.onvoiceschanged = function () {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        dispatch(receiveVoices());
        speechSynthesis.onvoiceschanged = undefined;
      }
    };
  }

  onPlay() {
    const { dispatch, messages, playback } = this.props;
    if (playback.isPlaying || !messages.length) return;

    dispatch(startPlayback());
    dispatch(setCurrentlyPlaying(messages[0]));

    messages.forEach((message, i) => {
      this.play(message, () => {
        if (i >= messages.length - 1) {
          dispatch(stopPlayback());
        } else {
          dispatch(setCurrentlyPlaying(messages[i + 1]));
        }
      });
    });
  }

  onStop() {
    const { dispatch, playback } = this.props;
    if (!playback.isPlaying) return;

    window.speechSynthesis.cancel();

    dispatch(stopPlayback());
    dispatch(setCurrentlyPlaying(null));
  }

  play(message, callback) {
    if (!message.text || !message.text.length) return callback(message);

    const { voices } = this.props;
    const utterance = new SpeechSynthesisUtterance(message.text);

    Object.assign(utterance, {
      voice: voices[message.voiceId],
      pitch: message.pitch,
      rate: message.rate,
      onend: () => callback(message)
    });

    window.speechSynthesis.speak(utterance);
  }

  createMessage() {
    const { dispatch } = this.props;
    dispatch(createMessage());
  }

  render() {
    const { playback, dispatch } = this.props;
    return (
      <App>
        <div className="container app-container">
          <ConversationActions
            isPlaying={playback.isPlaying}
            onPlay={::this.onPlay}
            onStop={::this.onStop}
            dispatch={dispatch}
          />
          <Conversation />

          <FloatingActionButton
            style={{ position: 'fixed', right: '15px', bottom: '15px' }}
            secondary
            onClick={::this.createMessage}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </App>
    );
  }
}

function mapStateToProps(state) {
  const { playback, messages, voices } = state;

  return {
    playback,
    messages,
    voices
  };
}

Root.propTypes = {
  playback: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  voices: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Root);
