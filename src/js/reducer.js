import {Map} from 'immutable';

function setDirectories(state, dirType, dirName) {
  const oldDir = state.getIn(['directories', dirType]);
  return state.setIn(['directories', dirType], oldDir.set('path', dirName));
}

function directoryParsed(state, dirs, dirType) {
  const oldDir = state.getIn(['directories', dirType]);

  let now = new Date().toISOString();
  console.log(dirs);
  return state.setIn(['directories', dirType], oldDir.withMutations(dir => {
    dir.set('lastUpdate', now).set('data', dirs);
  }));
}

function directoryParsedErrs(state, errs) {
  for (let err of errs) {
    console.error(err);
  }
  return state;
}

function setView(state, view) {
  const oldViews = state.get('views');
  return state.set('views', oldViews.map( (v, k) => {
    return view === k;
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
        selectedFiles.push({
          path: filestart + file,
          env: env,
        });
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

function setFileModifications(state, modifications) {
  const oldAddData = state.get('addPropertyData');
  return state.set('addPropertyData', oldAddData.merge({
    fileModifications: modifications,
    finishedFileModifications: [],
  }));
}

function fileModificationDone(state, path) {
  let finishedMod = null;
  const newMods = state.getIn(['addPropertyData', 'fileModifications']).filter( m => {
    if (m.get('path') === path) {
      finishedMod = m;
    }

    return m.get('path') !== path;
  });

  const newFinishedMods = state.getIn(['addPropertyData', 'finishedFileModifications']).push(finishedMod);

  return state.setIn(['addPropertyData', 'fileModifications'], newMods)
    .setIn(['addPropertyData', 'finishedFileModifications'], newFinishedMods);
}

function fileModificationErr(state, err) {
  console.error(err);
  return state;
}

function resetWizard(state) {
  return state.set('propertyData', Map()).set('addPropertyData', Map());
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
    case 'SET_FILE_MODIFICATIONS':
      return setFileModifications(state, action.modifications);
    case 'FILE_MODIFICATION_DONE':
      return fileModificationDone(state, action.path);
    case 'FILE_MODIFICATION_ERR':
      return fileModificationErr(state, action.err);
    case 'RESET_WIZARD':
      return resetWizard(state);
  }
  return state;
}
