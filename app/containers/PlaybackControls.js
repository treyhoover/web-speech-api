import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button';
import {togglePlaying} from 'actions/playback';

class PlaybackControls extends Component {
  constructor(props) {
    super(props);
  }

  stopPlayback() {
    console.log('stopping playback');
  }

  startPlayback() {
    const {messages} = this.props;
    console.log('starting playback', messages);
  }

  togglePlaying() {
    const {dispatch, isPlaying} = this.props;
    if (isPlaying) {
      this.stopPlayback();
    } else {
      this.startPlayback();
    }

    dispatch(togglePlaying());
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
  const {playback, messages} = state;
  const {isPlaying} = playback;
  return {
    isPlaying,
    messages
  }
}

export default connect(mapStateToProps)(PlaybackControls)
