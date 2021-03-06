import { delay } from 'redux-saga'
import { put, takeEvery, select } from 'redux-saga/effects'
import { getDirectories, getPropertyData } from './selectors'

import ipc from '../ipc/renderer'

export function* executeFileModification(action) {
  try {
    yield ipc.addProperty(action.modificationToExecute.path, action.propertyName, action.modificationToExecute.value);
    yield put({type: 'FILE_MODIFICATION_DONE', path: action.modificationToExecute.path});
  }
  catch(err) {
    yield put({type: 'FILE_MODIFICATION_ERR', err: err});
  }
}

export function* parseDirectory() {
  const directories = (yield select(getDirectories)).toJS();

  for (let type in directories) {
    let path = directories[type].path;
    if (!path) {
      continue;
    }

    try {
      const parsedFiles = yield ipc.parseDirectory(path);
      yield put({ type: 'DIRECTORY_PARSED', dirs: mapFiles(parsedFiles, path), dirType: type});
    }
    catch(errs) {
      yield put({ type: 'DIRECTORY_PARSED_ERRS', errors: errs});
    }
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
      mappedVals[proj].environments.add(env.split('-')[0]);
    }
  }
  return mappedVals;
}

export function* watchParseDirectory() {
  yield takeEvery('PARSE_DIRECTORY', parseDirectory);
}

export function* watchExecuteFileModifications() {
  yield takeEvery('EXECUTE_FILE_MODIFICATION', executeFileModification);
}

export default function* rootSaga() {
  yield [
    watchParseDirectory(),
    watchExecuteFileModifications(),
  ]
}
