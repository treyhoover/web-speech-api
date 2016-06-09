import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class ConversationActions extends Component {
  togglePlaying() {
    const { isPlaying, onPlay, onStop } = this.props;
    return isPlaying ? onStop() : onPlay();
  }

  removeAll() {
    const { onRemoveAll } = this.props;
    onRemoveAll();
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <div>
        <RaisedButton label={isPlaying ? 'Stop' : 'Play'} secondary onClick={::this.togglePlaying} />
        {' '}
        <RaisedButton label={'Remove All'} secondary onClick={::this.removeAll} />
      </div>
    );
  }
}

ConversationActions.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onRemoveAll: PropTypes.func.isRequired
};

export default ConversationActions;
