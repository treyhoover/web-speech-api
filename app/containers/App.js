import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import Navbar from 'components/Navbar';
import PlaybackControls from 'components/PlaybackControls';
import Conversation from 'components/Conversation';
import {receiveVoices} from 'actions/voices';
import {setMessageText, setMessagePitch, setMessageRate, setMessageVoice, createMessage} from 'actions/messages';
import {startPlayback, stopPlayback, setCurrentlyPlaying} from 'actions/playback';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

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

  play(message, callback) {
    const {dispatch, voices} = this.props;
    const utterance = new SpeechSynthesisUtterance(message.text);

    Object.assign(utterance, {
      voice: voices[message.voiceId],
      pitch: message.pitch,
      rate: message.rate,
      onend: () => callback(message)
    });

    window.speechSynthesis.speak(utterance);
  }

  onPlay() {
    const {dispatch, messages, playback} = this.props;
    if (playback.isPlaying || !messages.length) return;

    dispatch(startPlayback());
    dispatch(setCurrentlyPlaying(messages[0]));

    for (let i in messages) {
      this.play(messages[i], message => {
        if (i >= messages.length - 1) {
          dispatch(stopPlayback())
        } else {
          dispatch(setCurrentlyPlaying(messages[i + 1]));
        }
      });
    }
  }

  onStop() {
    const {dispatch, playback} = this.props;
    if (!playback.isPlaying) return;

    window.speechSynthesis.cancel();

    dispatch(stopPlayback());
    dispatch(setCurrentlyPlaying(null));
  }

  onTextChange(id, text) {
    const {dispatch} = this.props;
    dispatch(setMessageText(id, text));
  }

  onVoiceChange(id, voice) {
    const {dispatch} = this.props;
    dispatch(setMessageVoice(id, voice));
  }

  onRateChange(id, rate) {
    const {dispatch} = this.props;
    dispatch(setMessageRate(id, rate));
  }

  onPitchChange(id, pitch) {
    const {dispatch} = this.props;
    dispatch(setMessagePitch(id, pitch));
  }

  createMessage() {
    const {dispatch, messages} = this.props;
    dispatch(createMessage({id: messages.length + 1}));
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
                        voices={voices}
                        playback={playback}
                        onTextChange={::this.onTextChange}
                        onVoiceChange={::this.onVoiceChange}
                        onPitchChange={::this.onPitchChange}
                        onRateChange={::this.onRateChange}
          />

          <FloatingActionButton style={{position: 'fixed', right: '15px', bottom: '15px'}} secondary={true} onClick={::this.createMessage}>
            <ContentAdd />
          </FloatingActionButton>
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
