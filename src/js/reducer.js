import {Map} from 'immutable';

function setDirectories(state, dirType, dirName) {
  const oldDir = state.getIn(['directories', dirType]);
  return state.setIn(['directories', dirType], oldDir.set('path', dirName));
}

function toggleConfig(state) {
  return state.update('configOpen', configOpen => !configOpen);
}

function directoryParsed(state, dirs, dirType) {
  const oldDir = state.getIn(['directories', dirType]);

  let now = new Date().toISOString();
  return state.setIn(['directories', dirType], oldDir.withMutations(dir => {
    dir.set('lastUpdate', now).set('data', dirs);
  }));
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
      return directoryParsed(state, action.dirs, action.dirType);
    case 'DIRECTORY_PARSED_ERRS':
      return directoryParsedErrs(state, action.errors);
  }
  return state;
}
