import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import SpokenTextControls from 'containers/SpokenTextControls';
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
    return e => {
      const {onTextChange} = this.props;
      onTextChange(id, e.target.value);
    }
  }

  render() {
    const {messages = [], onTextChange} = this.props;
    return (
      <ol className="conversation">
        {messages.map(message => {
          const {id, voiceId, rate, pitch, author, text} = message;
          return (
            <li key={id}>
              <Card style={{marginBottom: '15px'}}>
                <CardHeader style={{height: 'auto'}}
                  title={author}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={false} style={{paddingTop: '0'}}>
                  <textarea style={textStyle} value={text} onChange={::this._onTextChange(id)}/>
                </CardText>
                <CardText expandable={true} style={{borderTop: '1px solid #eee'}} >
                  <SpokenTextControls id={id} voiceId={voiceId} rate={rate} pitch={pitch}/>
                </CardText>
                <CardActions expandable={true}>
                  <FlatButton label="Delete"/>
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