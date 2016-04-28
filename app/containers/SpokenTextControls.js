import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Slider from 'material-ui/lib/slider';

import {populateVoices} from 'actions/voices';
import {setMessageVoice} from 'actions/messages';

import styles from './../app.css';

class SpokenTextControls extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(populateVoices());
  }

  changeVoice(e, idx, voiceId) {
    const {id, dispatch} = this.props;
    dispatch(setMessageVoice(id, voiceId));
  }

  changeRate(e, newRate) {
    const {id} = this.props;
    console.log(id, 'changing rate', newRate);
  }

  changePitch(e, newPitch) {
    const {id} = this.props;
    console.log(id, 'changing pitch', newPitch);
  }

  render() {
    const {id, rate, pitch, voices = [], voiceId = 1} = this.props;

    return (
      <div className="spoken-text">
        <label htmlFor="voice">Voice</label>
        <div>
          <SelectField name="voice" value={voiceId} disabled={false} onChange={::this.changeVoice}>
            {voices.length ? voices.map((v, idx) => <MenuItem key={idx} value={idx} primaryText={v.name}/>) : null}
          </SelectField>
        </div>

        <div>
          <label htmlFor="rate">Rate</label>
          <Slider
            className="rate-slider"
            name='rate'
            min={0.5}
            max={2}
            defaultValue={1}
            onChange={::this.changeRate}
          />
        </div>

        <div>
          <label htmlFor="pitch">Pitch</label>
          <Slider
            className="pitch-slider"
            name="pitch"
            min={0}
            max={2}
            defaultValue={1}
            onChange={::this.changePitch}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {voices = []} = state;
  return {
    voices
  }
}

export default connect(mapStateToProps)(SpokenTextControls)
