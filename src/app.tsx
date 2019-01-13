import { MuiThemeProvider } from '@material-ui/core/styles';
import { UIRouter, UIView } from '@uirouter/react';
import router from 'config/router';
import theme from 'config/theme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import model from './model';
import './styles/main.css';

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
      <UIRouter router={router}>
        <UIView />
      </UIRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
