import {Map} from 'immutable';

function setDirectories(state, dirType, dirName) {
  const oldPaths = state.get('directoryPaths');
  let obj = {};
  obj[dirType] = dirName;
  return state.set('directoryPaths', {...oldPaths, ...obj});
}

function toggleConfig(state) {
  return state.update('configOpen', configOpen => !configOpen);
}

function directoryParsed(state, dirs) {
  return state;
}

function directoryParsedErrs(state, errs) {
  for (let err of errs) {
    console.log(err);
  }
  return state;
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return setDirectories(state, action.dirType, action.dirName);
    case 'TOGGLE_CONFIG':
      return toggleConfig(state);
    case 'DIRECTORY_PARSED':
      return directoryParsed(state, action.dirs);
    case 'DIRECTORY_PARSED_ERRS':
      return directoryParsedErrs(state, action.errors);
  }
  return state;
}
