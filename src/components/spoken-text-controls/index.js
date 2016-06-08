import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/slider';

import styles from '../../app.css';

const menuStyles = {
  whiteSpace: 'no-wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '15px'
};

const sliderStyles = {
  margin: '15px 0'
};

class SpokenTextControls extends Component {
  changeVoice(e, idx, voiceId) {
    const {id, onVoiceChange} = this.props;
    onVoiceChange(id, voiceId);
  }

  changeRate(e, newRate) {
    const {id, onRateChange} = this.props;
    onRateChange(id, newRate);
  }

  changePitch(e, newPitch) {
    const {id, onPitchChange} = this.props;
    onPitchChange(id, newPitch);
  }

  render() {
    const {id, rate, pitch, voices = [], voiceId = 1, settingsDisabled} = this.props;

    return (
      <div>
        <label htmlFor="voice">Voice</label>
        <div>
          <SelectField name="voice" value={voiceId} disabled={false} style={menuStyles}
                       onChange={::this.changeVoice}>
            {
              voices.length ? voices.map((v, idx) => {
                return <MenuItem key={idx} value={idx} primaryText={`${v.name} (${v.lang})`}/>
              }) : null
            }
          </SelectField>
        </div>

        <div>
          <label htmlFor="rate">Rate</label>
          <Slider
            className="rate-slider"
            style={sliderStyles}
            name='rate'
            min={0.5}
            max={2}
            value={rate}
            disabled={settingsDisabled}
            onChange={::this.changeRate}
          />
        </div>

        <div>
          <label htmlFor="pitch">Pitch</label>
          <Slider
            className="pitch-slider"
            style={sliderStyles}
            name="pitch"
            min={0.1}
            max={2}
            value={pitch}
            disabled={settingsDisabled}
            onChange={::this.changePitch}
          />
        </div>
      </div>
    );
  }
}

export default SpokenTextControls;
