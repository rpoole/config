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

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return setDirectories(state, action.dirType, action.dirName);
    case 'TOGGLE_CONFIG':
      return toggleConfig(state);
  }
  return state;
}
