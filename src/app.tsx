import { UIRouter, UIView } from '@uirouter/react';
import { router, store } from 'config/init';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/main.css';
​
ReactDOM.render(
  <Provider store={store}>
    <UIRouter router={router}>
      <UIView />
    </UIRouter>
  </Provider>,
  document.getElementById('root'),
);
