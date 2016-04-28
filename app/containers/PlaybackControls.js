import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

class PlaybackControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Playback controls!</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(PlaybackControls)
