import 'babel-polyfill';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // https://github.com/zilverline/react-tap-event-plugin
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Theme from './config/theme';
import Root from './containers/root';
import configureStore from './store';
import { saveState } from './models/localstorage';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const muiTheme = getMuiTheme(Theme);

store.subscribe(() => {
  saveState({
    messages: store.getState().messages
  });
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Route name="Home" path="/" component={Root}/>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
