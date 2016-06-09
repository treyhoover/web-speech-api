import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import Delete from 'material-ui/svg-icons/action/delete';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import ConversationActions from '../../components/spoken-text-controls';
import Theme from '../../config/theme';
import '../../app.css';

const iconStyle = {
  width: 30,
  height: 30,
  fill: Theme.palette.primary1Color
};

const iconButtonStyle = {
  width: 60,
  height: 60,
  padding: 15
};

const textStyle = {
  width: '100%',
  border: 'none',
  resize: 'none',
  color: Theme.palette.textColor,
  height: '40px',
  fontSize: '1em'
};

class Conversation extends Component {
  _onTextChange(id) {
    return (e) => {
      const { onTextChange } = this.props;
      onTextChange(id, e.target.value);
    };
  }

  _onCopy(id) {
    return (e) => {
      const { onCopyMessage  } = this.props;
      onCopyMessage (id);
    };
  }

  _onAuthorChange(id) {
    return (e) => {
      const { onAuthorChange } = this.props;
      onAuthorChange(id, e.target.value);
    };
  }

  _onPitchChange(id, newPitch) {
    const { onPitchChange } = this.props;
    onPitchChange(id, newPitch);
  }

  _onRateChange(id, newRate) {
    const { onRateChange } = this.props;
    onRateChange(id, newRate);
  }

  _onVoiceChange(id, voiceId) {
    const { onVoiceChange } = this.props;
    onVoiceChange(id, voiceId);
  }

  _onDelete(id) {
    return () => {
      const { onDelete } = this.props;
      onDelete(id);
    };
  }

  render() {
    const { messages = [], voices, playback } = this.props;
    return (
      <ol className="conversation">
        {messages.map(message => {
          const { id, voiceId, rate, pitch, author, text } = message;
          return (
            <li key={id}>
              <Card style={{ marginBottom: '15px' }}>
                <CardHeader
                  style={{ height: 'auto' }}
                  title={
                    <input
                      style={{ ...textStyle, height: '20px' }}
                      value={author}
                      placeholder="Anonymous"
                      onChange={::this._onAuthorChange(id)}
                    />
                  }
                  showExpandableButton
                />
                <CardText expandable={false} style={{ paddingTop: '0px' }}>
                  <textarea
                    style={textStyle} value={text}
                    placeholder="Say something"
                    onChange={::this._onTextChange(id)}
                  />
                  <Divider />
                </CardText>
                <CardText expandable>
                  <ConversationActions
                    voices={voices}
                    id={id}
                    settingsDisabled={playback.isPlaying}
                    voiceId={voiceId}
                    onVoiceChange={::this._onVoiceChange}
                    rate={rate}
                    onRateChange={::this._onRateChange}
                    pitch={pitch}
                    onPitchChange={::this._onPitchChange}
                  />
                  <Divider />
                </CardText>
                <CardActions expandable={false}>
                  <IconButton
                    onClick={::this._onDelete(id)}
                    iconStyle={iconStyle}
                    style={iconButtonStyle}
                  >
                    <Delete />
                  </IconButton>

                  <IconButton
                    onClick={::this._onCopy(id)}
                    iconStyle={iconStyle}
                    style={iconButtonStyle}
                  >
                    <OpenInNew />
                  </IconButton>
                </CardActions>
              </Card>
            </li>
          );
        })}
      </ol>
    );
  }
}

Conversation.propTypes = {
  messages: PropTypes.array.isRequired,
  onVoiceChange: PropTypes.func.isRequired,
  onCopyMessage: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onRateChange: PropTypes.func.isRequired,
  onPitchChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  voices: PropTypes.array.isRequired,
  playback: PropTypes.object.isRequired,
  onAuthorChange: PropTypes.func.isRequired
};

export default Conversation;
