import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {mainReducer} from './reducers/mainReducer';
import {View, Header} from './components'

import './styles/styles.css';

function middleware({dispatch, getState}) {
  return next => action => {
      if (typeof action === 'function') {
          return action(dispatch, getState);
      }

      return next(action);
  };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  mainReducer,
  undefined,
  composeEnhancers(
      applyMiddleware(middleware)
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View />
      </Provider>
      )
  }
}
