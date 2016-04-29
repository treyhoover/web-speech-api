import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class PlaybackControls extends Component {
  constructor(props) {
    super(props);
  }

  togglePlaying() {
    const {isPlaying, onPlay, onStop} = this.props;
    return isPlaying ? onStop() : onPlay();
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

export default PlaybackControls;
