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
    onChange={e => props.onChange(e.target.value)}
  />
);

Author.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

class Message extends Component {
  onChange(key) {
    const { id } = this.props.data;
    return (value) => {
      this.props.onChange(id, key, value);
    };
  }

  render() {
    const { playback, voices } = this.props;
    const { id, voiceId, rate, pitch, author, text } = this.props.data;
    const { onChange } = this.props;
    return (
      <li className="message">
        <Card style={{ marginBottom: '15px' }}>
          <CardHeader
            style={{ height: 'auto' }}
            title={<Author author={author} id={id} onChange={::this.onChange('author')} />}
            showExpandableButton
          />
          <CardText expandable={false} style={{ paddingTop: '0px' }}>
            <textarea
              style={textStyle}
              value={text}
              placeholder="Say something"
              onChange={e => ::this.onChange('text')(e.target.value)}
            />
            <Divider />
          </CardText>
          <CardText expandable>
            <SpokenTextControls
              voices={voices}
              settingsDisabled={playback.isPlaying}
              voiceId={voiceId}
              onVoiceChange={v => ::this.onChange('voiceId')(v)}
              rate={rate}
              onRateChange={v => ::this.onChange('rate')(v)}
              pitch={pitch}
              onPitchChange={v => ::this.onChange('pitch')(v)}
            />
            <Divider />
          </CardText>
          <CardActions expandable={false}>
            <IconButton
              onClick={() => ::this.onChange('delete')()}
              iconStyle={iconStyle}
              style={iconButtonStyle}
            >
              <Delete />
            </IconButton>

            <IconButton
              onClick={() => ::this.onChange('copy')()}
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
  onChange: PropTypes.func.isRequired,
  playback: PropTypes.object.isRequired,
  voices: PropTypes.array.isRequired
};

export default Message;