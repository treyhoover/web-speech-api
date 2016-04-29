import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import SpokenTextControls from 'components/SpokenTextControls';
import Theme from 'config/theme';
import styles from './../app.css';

const textStyle = {
  width: '100%',
  border: 'none',
  resize: 'none',
  color: Theme.palette.textColor,
  height: '40px',
  fontSize: '1em'
};

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  _onTextChange(id) {
    return (e) => {
      const {onTextChange} = this.props;
      onTextChange(id, e.target.value);
    }
  }

  _onAuthorChange(id) {
    return (e) => {
      const {onAuthorChange} = this.props;
      onAuthorChange(id, e.target.value);
    }
  }

  _onPitchChange(id, newPitch) {
    const {onPitchChange} = this.props;
    onPitchChange(id, newPitch);
  }

  _onRateChange(id, newRate) {
    const {onRateChange} = this.props;
    onRateChange(id, newRate);
  }

  _onVoiceChange(id, voiceId) {
    const {onVoiceChange} = this.props;
    onVoiceChange(id, voiceId);
  }

  _onDelete(id) {
    return () => {
      const {onDelete} = this.props;
      onDelete(id);
    }
  }

  render() {
    const {messages = [], voices, playback} = this.props;
    return (
      <ol className="conversation">
        {messages.map(message => {
          const {id, voiceId, rate, pitch, author, text} = message;
          return (
            <li key={id}>
              <Card style={{marginBottom: '15px'}}>
                <CardHeader style={{height: 'auto'}}
                            title={<textarea style={{...textStyle, height: '20px'}} value={author} placeholder="Say something"
                            onChange={::this._onAuthorChange(id)}/>}
                            actAsExpander={true}
                            showExpandableButton={true}
                />
                <CardText expandable={false} style={{paddingTop: '0'}}>
                  <textarea style={textStyle} value={text} placeholder="Say something" onChange={::this._onTextChange(id)}/>
                </CardText>
                <CardText expandable={true} style={{borderTop: '1px solid #eee'}}>
                  <SpokenTextControls voices={voices} id={id} settingsDisabled={playback.isPlaying}
                                      voiceId={voiceId} onVoiceChange={::this._onVoiceChange}
                                      rate={rate} onRateChange={::this._onRateChange}
                                      pitch={pitch} onPitchChange={::this._onPitchChange}/>
                </CardText>
                <CardActions expandable={false}>
                  <FlatButton onClick={::this._onDelete(id)} label="Delete"/>
                  {/*<FlatButton onClick={} label="Duplicate"/>*/}
                </CardActions>
              </Card>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default Conversation;
