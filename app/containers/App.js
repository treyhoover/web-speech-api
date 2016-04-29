import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import Navbar from 'components/Navbar';
import PlaybackControls from 'components/PlaybackControls';
import Conversation from 'components/Conversation';
import {receiveVoices} from 'actions/voices';
import {setMessageText} from 'actions/messages';
import {startPlayback, stopPlayback, setCurrentlyPlaying} from 'actions/playback';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    speechSynthesis.onvoiceschanged = function () {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        dispatch(receiveVoices());
        speechSynthesis.onvoiceschanged = undefined;
      }
    }
  }

  play(message, index, callback) {
    const {dispatch, voices} = this.props;
    const utterance = new SpeechSynthesisUtterance(message.text);

    dispatch(setCurrentlyPlaying(message));

    Object.assign(utterance, {
      voice: voices[message.voiceId],
      pitch: message.pitch,
      rate: message.rate,
      onend: () => callback(message, index)
    });

    window.speechSynthesis.speak(utterance);
  }

  onPlay() {
    const {dispatch, messages} = this.props;
    dispatch(startPlayback());

    this.play(messages[0], 0, (function next(lastMessage, lastIndex) {
      const nextIndex = lastIndex + 1;
      const nextMessage = messages[nextIndex];

      if (nextMessage) {
        this.play(nextMessage, nextIndex, next);
      } else {
        dispatch(stopPlayback());
      }
    }).bind(this));
  }

  onStop() {
    const {dispatch} = this.props;
    dispatch(stopPlayback());
    dispatch(setCurrentlyPlaying(null));
  }

  onTextChange(id, text) {
    const {dispatch} = this.props;
    dispatch(setMessageText(id, text));
  }

  render() {
    const {playback, messages, voices} = this.props;
    return (
      <div>
        <Navbar />
        <div className="container app-container">
          <PlaybackControls isPlaying={playback.isPlaying}
                            voices={voices}
                            onPlay={::this.onPlay}
                            onStop={::this.onStop}
          />
          <Conversation messages={messages}
                        onTextChange={::this.onTextChange}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {playback, messages, voices} = state;

  return {
    playback,
    messages,
    voices
  }
}

export default connect(mapStateToProps)(App)
