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
import './style.css';

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
  render() {
    const { messages = [], voices, playback } = this.props;
    const {
      onDelete,
      onVoiceChange,
      onRateChange,
      onPitchChange,
      onAuthorChange,
      onCopyMessage,
      onTextChange
    } = this.props;
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
                      onChange={e => onAuthorChange(id, e.target.value)}
                    />
                  }
                  showExpandableButton
                />
                <CardText expandable={false} style={{ paddingTop: '0px' }}>
                  <textarea
                    style={textStyle} value={text}
                    placeholder="Say something"
                    onChange={e => onTextChange(id, e.target.value)}
                  />
                  <Divider />
                </CardText>
                <CardText expandable>
                  <ConversationActions
                    voices={voices}
                    id={id}
                    settingsDisabled={playback.isPlaying}
                    voiceId={voiceId}
                    onVoiceChange={() => onVoiceChange(id, voiceId)}
                    rate={rate}
                    onRateChange={onRateChange}
                    pitch={pitch}
                    onPitchChange={onPitchChange}
                  />
                  <Divider />
                </CardText>
                <CardActions expandable={false}>
                  <IconButton
                    onClick={() => onDelete(id)}
                    iconStyle={iconStyle}
                    style={iconButtonStyle}
                  >
                    <Delete />
                  </IconButton>

                  <IconButton
                    onClick={() => onCopyMessage(id)}
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
