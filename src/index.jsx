import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {ConfigAppContainer} from './components/ConfigApp';
import {Map} from 'immutable';

const initialState = Map({
  directoryPaths: {
    prod: null,
    test: null,
    dev: null,
  },
  configOpen: true,
});

const store = createStore(reducer, initialState);

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigAppContainer />
    </Provider>,
    document.getElementById('app')
  );
};
