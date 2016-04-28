import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

import Navbar from 'components/Navbar';
import PlaybackControls from 'containers/PlaybackControls';
import Conversation from 'containers/Conversation';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <PlaybackControls />
          <Conversation />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
