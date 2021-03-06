import 'babel-polyfill';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // https://github.com/zilverline/react-tap-event-plugin
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

import Theme from 'config/theme';
import App from 'containers/App';
import configureStore from 'store';
import style from './style.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const muiTheme = getMuiTheme(Theme);

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Route name="Home" path="/" component={App} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
