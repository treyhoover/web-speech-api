import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Slider from 'material-ui/lib/slider';

import {setMessageVoice} from 'actions/messages';

import styles from './../app.css';

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
            defaultValue={1}
            onChange={::this.changeRate}
          />
        </div>

        <div>
          <label htmlFor="pitch">Pitch</label>
          <Slider
            className="pitch-slider"
            style={sliderStyles}
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
