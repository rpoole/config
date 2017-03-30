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

const data = JSON.parse('{"dp-core":{"filetypes":["sers.properties",".database.properties",".properties"],"environments":["int1","int2","int3"]},"af-snappass":{"filetypes":[".properties.yml"],"environments":["int1"]},"dp-export":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-fe":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-main":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-rights":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"dp-soaparou":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"ifpi-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1"]},"isrc-fe":{"filetypes":["ble.properties",".deployment.properties",".migrate.properties",".properties"],"environments":["int1"]},"lm-etl":{"filetypes":[".Lockbox_to_LMDB.properties",".OCR_to_LMWS.properties",".PortalsEntitySync.properties",".SalesforceCRM_to_LMWS.properties",".SalesforeceCase_Sync.properties",".Trigger_DM_Matching_Stats.properties",".Trigger_FTP_Mail.properties",".Trigger_ROU_Matching_Stats.properties",".Trigger_ROU_Stats.properties",".Trigger_SOAPaROU_Status.properties",".properties"],"environments":["int1","int2","int3"]},"lm-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2","int3"]},"log-aggregator":{"filetypes":[".deployment.properties",".deployment.properties.yml"],"environments":["int1"]},"lm-portal":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2","int3"]},"lm-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"lm-jobs":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int3"]},"olr-fe":{"filetypes":[".aws-s3-regdocs-sync.properties",".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2"]},"portals-dist-etl":{"filetypes":[".deployment.properties",".properties"],"environments":["int1"]},"plays-fe":{"filetypes":["deployment.properties",".deployment.properties",".properties"],"environments":["int1","int3"]},"portals-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties"],"environments":["int1","int2"]},"rights-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1","int6","int2","int3"]},"rm-core":{"filetypes":[".database.properties"],"environments":["int1","int3"]},"rm-idengine":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-fe":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-publishing":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1"]},"rm-submission-ws":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-submission-batch":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-solr-search":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-workflow-engine":{"filetypes":[".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"rm-workflow-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int1","int2","int3"]},"syslog-server":{"filetypes":[".deployment.properties"],"environments":["int1","int2"]},"udm-fe":{"filetypes":[".deployment.properties",".migrate.properties",".properties",".ansible.properties"],"environments":["int1","int6","int2","int3"]},"portals-etl":{"filetypes":[".properties"],"environments":["int2"]},"udm-batch":{"filetypes":[".deployment.properties",".properties"],"environments":["int2"]},"udm-ws":{"filetypes":[".database.properties",".deployment.properties",".properties"],"environments":["int2"]}}');

const initialState = Map({
  directories: Map({
    prod: new Directory({type: 'prod', data: null, lastUpdate: null,}),
    test: new Directory({type: 'test', data: null, lastUpdate: null,}),
    dev: new Directory({type: 'dev', data: data, lastUpdate: 'now', path: '/Users/rpoole/code/dev_config'}),
  }),
  views: Map({
    editConfig: false,
    addSelectProperty: true,
    addPropertyListChangedFiles: false,
    addPropertyAddToFiles: false,
    removeSelectProperty: false,
  }),
  propertyData: Map({
    propertyName: 'SOME_NAME',
    environments: 'int3',
    project: 'lm-portal',
    filename: '^(\.migrate)?.properties',
    selectedFiles: null,
    method: 'applyToAllFiles',
  }),
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
