import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/lib/raised-button';
import * as actions from 'actions/playback'

class PlaybackControls extends Component {
  constructor(props) {
    super(props);
  }

  _stopPlayback() {
    console.log('stopping...');
    const {isPlaying} = this.props;
    if (isPlaying) actions.stopPlayback();
  }

  _startPlayback() {
    console.log('starting...');
    const {messages, voices} = this.props;
    actions.startPlayback();

    for (let i in messages) {
      const message = messages[i];
      const isLastMessage = i == (messages.length - 1);

      const onend = isLastMessage ? ::this._stopPlayback : function () {};

      const utterance = new SpeechSynthesisUtterance(message.text);
      Object.assign(utterance, {
        voice: voices[message.voiceId],
        pitch: message.pitch,
        rate: message.rate,
        onend: onend
      });

      window.speechSynthesis.speak(utterance);
    }
  }

  togglePlaying() {
    const {isPlaying} = this.props;
    return isPlaying ? ::this._stopPlayback() : ::this._startPlayback();
  }

  render() {
    const {isPlaying} = this.props;
    return (
      <div>
        <RaisedButton label={isPlaying ? 'Pause' : 'Play'} secondary={true} onClick={::this.togglePlaying}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {playback, messages, voices} = state;
  const {isPlaying} = playback;
  return {
    isPlaying,
    messages,
    voices
  }
}

function mapDispatchToProps (dispatch) {
  const {startPlayback, stopPlayback} = actions;

  return bindActionCreators ({
    startPlayback,
    stopPlayback
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackControls)
