import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Map} from 'immutable';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import {ConfigAppContainer} from './components/ConfigApp';
import rootSaga from './sagas/sagas';
import {Directory} from './records';

const initialState = Map({
  directories: Map({
    prod: new Directory({type: 'prod'}),
    test: new Directory({type: 'test'}),
    dev: new Directory({type: 'dev'}),
  }),
  configOpen: true,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, 
    initialState,
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigAppContainer />
    </Provider>,
    document.getElementById('app')
  );
};
