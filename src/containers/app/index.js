import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import App from '../../components/app';
import ConversationActions from '../../components/conversation-actions';
// import Conversation from '../../components/conversation';
import Conversation from '../conversation';
import { receiveVoices } from '../../actions/voices';
import {
  setMessageText, setMessagePitch, setMessageRate,
  setMessageVoice, createMessage, deleteMessage, setMessageAuthor, copyMessage, removeAllMessages
} from '../../actions/messages';
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

  onRemoveAll() {
    const { dispatch } = this.props;
    dispatch(removeAllMessages());
  }

  onTextChange(id, text) {
    const { dispatch } = this.props;
    dispatch(setMessageText(id, text));
  }

  onAuthorChange(id, author) {
    const { dispatch } = this.props;
    dispatch(setMessageAuthor(id, author));
  }

  onVoiceChange(id, voice) {
    const { dispatch } = this.props;
    dispatch(setMessageVoice(id, voice));
  }

  onRateChange(id, rate) {
    const { dispatch } = this.props;
    dispatch(setMessageRate(id, rate));
  }

  onPitchChange(id, pitch) {
    const { dispatch } = this.props;
    dispatch(setMessagePitch(id, pitch));
  }

  onDelete(id) {
    const { dispatch } = this.props;
    dispatch(deleteMessage({ id }));
  }

  onCopyMessage(id) {
    const { dispatch } = this.props;
    dispatch(copyMessage({ id }));
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
    return (
      <App>
        <div className="container app-container">
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
