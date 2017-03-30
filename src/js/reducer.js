import {Map} from 'immutable';

function setDirectories(state, dirType, dirName) {
  const oldDir = state.getIn(['directories', dirType]);
  return state.setIn(['directories', dirType], oldDir.set('path', dirName));
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

function setView(state, view) {
  const oldViews = state.get('views');
  return state.set('views', oldViews.map( (v, k) => {
    return view === k ? !v : false;
  }));
}

function setPropMethod(state, method) {
  const oldData = state.get('propertyData');
  return state.set('propertyData', oldData.merge({
    method: method,
  }));
}

function matchFiles(state, propertyName, environments, project, filename) {
  const oldPropData = state.get('propertyData');
  const dirs = state.get('directories');
  let selectedFiles = [];

  dirs.forEach( dir => {
    if (dir.get('lastUpdate') === null) {
      return;
    }

    const data = dir.get('data');
    if (!data.hasOwnProperty(project)) {
      return;
    }

    let proj = data[project];
    let matchedEnvs = [...proj.environments].filter( env => env.match(new RegExp(environments)));
    if (matchedEnvs.length === 0) {
      return;
    }

    let matchedFiles = [...proj.filetypes].filter( ft => ft.match(new RegExp(filename)));
    if (matchedFiles.length === 0) {
      return;
    }

    matchedEnvs.forEach( env => {
      let filestart = `${dir.get('path')}/${env}-configs/${project}/${env}`;
      matchedFiles.forEach( file => {
        selectedFiles.push(filestart + file);
      });
    });
  });

  return state.set('propertyData', oldPropData.merge({
    propertyName: propertyName,
    environments: environments,
    project: project,
    filename: filename,
    selectedFiles: selectedFiles,
  }));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_DIRECTORY':
      return setDirectories(state, action.dirType, action.dirName);
    case 'DIRECTORY_PARSED':
      return directoryParsed(state, action.dirs, action.dirType);
    case 'DIRECTORY_PARSED_ERRS':
      return directoryParsedErrs(state, action.errors);
    case 'MATCH_FILES':
      return matchFiles(state, action.propertyName, action.environments, action.project, action.filename);
    case 'SET_VIEW':
      return setView(state, action.view);
    case 'SET_PROP_METHOD':
      return setPropMethod(state, action.method);
  }
  return state;
}
