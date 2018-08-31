import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import theme from './config/theme';
import model from './model';

const store = createStore(
  model,
  __MODE__  !== 'production'
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : null,
);
​
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      Hello World
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
