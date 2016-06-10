import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import Delete from 'material-ui/svg-icons/action/delete';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Theme from '../../config/theme';

import SpokenTextControls from '../../components/spoken-text-controls';
import * as actions from '../../actions/messages';

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

const Author = (props) => (
  <input
    style={{ ...textStyle, height: '20px' }}
    value={props.author}
    placeholder="Anonymous"
    onChange={e =>
      props.dispatch(actions.setMessageAuthor({ id: props.id, author: e.target.value }))}
  />
);

Author.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

class Message extends Component {
  render() {
    const { playback, voices, dispatch } = this.props;
    const { id, voiceId, rate, pitch, author, text } = this.props.data;
    return (
      <li className="message">
        <Card style={{ marginBottom: '15px' }}>
          <CardHeader
            style={{ height: 'auto' }}
            title={<Author id={id} author={author} {...this.props} />}
            showExpandableButton
          />
          <CardText expandable={false} style={{ paddingTop: '0px' }}>
            <textarea
              style={textStyle}
              value={text}
              placeholder="Say something"
              onChange={e => dispatch(actions.setMessageText({ id, text: e.target.value }))}
            />
            <Divider />
          </CardText>
          <CardText expandable>
            <SpokenTextControls
              voices={voices}
              settingsDisabled={playback.isPlaying}
              voiceId={voiceId}
              onVoiceChange={voiceId => dispatch(actions.setMessageVoice({ id, voiceId }))}
              rate={rate}
              onRateChange={rate => dispatch(actions.setMessageRate({ id, rate }))}
              pitch={pitch}
              onPitchChange={pitch => dispatch(actions.setMessagePitch({ id, pitch }))}
            />
            <Divider />
          </CardText>
          <CardActions expandable={false}>
            <IconButton
              onClick={() => dispatch(actions.deleteMessage({ id }))}
              iconStyle={iconStyle}
              style={iconButtonStyle}
            >
              <Delete />
            </IconButton>

            <IconButton
              onClick={() => dispatch(actions.copyMessage({ id }))}
              iconStyle={iconStyle}
              style={iconButtonStyle}
            >
              <OpenInNew />
            </IconButton>
          </CardActions>
        </Card>
      </li>
    );
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired,
  playback: PropTypes.object.isRequired,
  voices: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Message;
