import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

import ipc from '../ipc/renderer'

export function* parseDirectory() {
  try {
    let root = '/Users/rpoole/code/dev_config';
    const parsedFiles = yield ipc.parseDirectory(root);
    yield put({ type: 'DIRECTORY_PARSED', dirs: mapFiles(parsedFiles, root)});
  } catch(errs) {
    yield put({ type: 'DIRECTORY_PARSED_ERRS', errors: errs});
  }
}

function mapFiles(dirs, root) {
  let envPattern = /(int|uat|pprd|prod)\d+-configs/;
  let projPattern = /\w+-\w+/;
  let filePattern = /.*\.properties/;

  let mappedVals = {};
  
  for (let f of dirs) {
    f = f.replace(root, '');

    let splits = f.split('/');
    let env = splits[1];
    let proj = splits[2];
    let file = splits[3].slice(4);

    if (env.match(envPattern) && proj.match(projPattern) && file.match(filePattern)) {
      if (!mappedVals.hasOwnProperty(proj)) {
        mappedVals[proj] = {
          filetypes: new Set(),
          environments: new Set(),
        };
      }

      mappedVals[proj].filetypes.add(file);
      mappedVals[proj].environments.add(env);
    }
  }
  return mappedVals;
}

export function* watchParseDirectory() {
  yield takeEvery('PARSE_DIRECTORY', parseDirectory);
}

export default function* rootSaga() {
  yield [
    watchParseDirectory(),
  ]
}
