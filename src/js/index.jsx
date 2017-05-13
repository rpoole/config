import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Map, List} from 'immutable';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import {ConfigAppContainer} from './containers/ConfigApp';
import rootSaga from './sagas/sagas';

//const data = JSON.parse('{"dp-core":{"filetypes":["sers.properties",".database.properties",".properties"],"environments":["int1","int2","int3"]},"af-snappass":{"filetypes":[".properties.yml"],"environments":["int1"]},"dp-export":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-fe":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-main":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-rights":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-soaparou":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"ifpi-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1"]},"isrc-fe":{"filetypes":["ble.properties",".deployment.properties",".migrate.properties",".properties"],"environments":["int1"]},"lm-etl":{"filetypes":[".Lockbox_to_LMDB.properties",".OCR_to_LMWS.properties",".PortalsEntitySync.properties",".SalesforceCRM_to_LMWS.properties",".SalesforeceCase_Sync.properties",".Trigger_DM_Matching_Stats.properties",".Trigger_FTP_Mail.properties",".Trigger_ROU_Matching_Stats.properties",".Trigger_ROU_Stats.properties",".Trigger_SOAPaROU_Status.properties",".properties"],"environments":["int1","int2","int3"]},"lm-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2","int3"]},"log-aggregator":{"filetypes":[".deployment.properties",".deployment.properties.yml"],"environments":["int1"]},"lm-portal":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2","int3"]},"lm-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"lm-jobs":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int3"]},"olr-fe":{"filetypes":[".aws-s3-regdocs-sync.properties",".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2"]},"portals-dist-etl":{"filetypes":[".deployment.properties",".properties"],"environments":["int1"]},"plays-fe":{"filetypes":["deployment.properties",".deployment.properties",".properties"],"environments":["int1","int3"]},"portals-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2"]},"rights-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1","int6","int2","int3"]},"rm-core":{"filetypes":[".database.properties"],"environments":["int1","int3"]},"rm-idengine":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-fe":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-publishing":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1"]},"rm-submission-ws":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-submission-batch":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-solr-search":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-workflow-engine":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-workflow-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"syslog-server":{"filetypes":[".deployment.properties"],"environments":["int1","int2"]},"udm-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties",".ansible.properties"],"environments":["int1","int6","int2","int3"]},"portals-etl":{"filetypes":[".properties"],"environments":["int2"]},"udm-batch":{"filetypes":[".deployment.properties",".properties"],"environments":["int2"]},"udm-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int2"]}}');

const data = JSON.parse('{"lm-portal":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int2","int1"]}}')

// TODO refactor this into reducers
const initialState = Map({
  directories: Map({
    prod: Map({type: 'prod', data: null, lastUpdate: null,}),
    test: Map({type: 'test', data: null, lastUpdate: null,}),
    dev: Map({type: 'dev', data: data, lastUpdate: 'now', path: '/Users/rpoole/code/sxconfig_test'}),
  }),
  gitPubKeyFile: null,
  gitPrivateKeyFile: null,
  gitPassword: null,
  views: new Map({
    editConfig: false,
    addSelectProperty: true,
    addPropertyListChangedFiles: false,
    addPropertyAddToFiles: false,
    addPropertyExecuteModifications: false,
    removeSelectProperty: false,
    removePropertyListFiles: false,
    removePropertyExecuteModifications: false,
  }),
  propertyData: Map({
    propertyName: 'SOME_NAME',
    environments: 'int2',
    project: 'lm-portal',
    filename: '^(\\.migrate)?.properties',
    selectedFiles: null,
    method: 'applyToAllFiles',
    fileModifications: List(),
    finishedFileModifications: List(),
  }),
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, 
    initialState,
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigAppContainer />
    </Provider>,
    document.getElementById('reactRoot')
  );
};
