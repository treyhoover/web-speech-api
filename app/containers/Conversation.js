import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import SpokenTextControls from 'containers/SpokenTextControls';
import styles from './../app.css';

class Conversation extends Component {
  constructor(props) {
    super(props);
  }

  handleTextChange(e) {
    console.log('text changed', e);
  }

  render() {
    const {messages = []} = this.props;
    return (
      <ol className="conversation">
        {messages.map(message => {
          const {id, voiceId, rate, pitch, author, text} = message;
          return (
            <li key={id}>
              <Card>
                <CardHeader
                  title={author}
                  subtitle={<textarea value={text} onChange={::this.handleTextChange}/>}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
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

function mapStateToProps(state) {
  const {messages = []} = state;
  return {
    messages
  }
}

export default connect(mapStateToProps)(Conversation)
