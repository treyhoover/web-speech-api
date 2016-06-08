import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class PlaybackControls extends Component {
  togglePlaying() {
    const { isPlaying, onPlay, onStop } = this.props;
    return isPlaying ? onStop() : onPlay();
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <div>
        <RaisedButton label={isPlaying ? 'Stop' : 'Play'} secondary onClick={::this.togglePlaying} />
      </div>
    );
  }
}

PlaybackControls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

export default PlaybackControls;
