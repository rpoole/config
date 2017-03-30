export function setDirectories(dirType, dirName) {                                                                                                                                                  
  return {                                                                                                                                                                                
    type: 'SET_DIRECTORY',
    dirType,
    dirName
  }                                                                                                                                                                                       
}                                                                                                                                                                                         

export function toggleConfig() {                                                                                                                                                  
  return {                                                                                                                                                                                
    type: 'TOGGLE_CONFIG'
  }                                                                                                                                                                                       
}                                                                                                                                                                                         

export function toggleAdd() {                                                                                                                                                  
  return {                                                                                                                                                                                
    type: 'TOGGLE_ADD'
  }                                                                                                                                                                                       
}                                                                                                                                                                                         

export function incrementAsync() {
  return {                                                                                                                                                                                
    type: 'INCREMENT_ASYNC'
  }                                                                                                                                                                                       
}

export function parseDirectory() {
  return {                                                                                                                                                                                
    type: 'PARSE_DIRECTORY'
  }                                                                                                                                                                                       
}

export function matchFiles(propertyName, environments, project, filename) {
  return {
    type: 'MATCH_FILES',
    propertyName,
    environments,
    project,
    filename
  }
}

export function setView(view) {
  return {
    type: 'SET_VIEW',
    view
  }
}

export function setPropMethod(method) {
  return {
    type: 'SET_PROP_METHOD',
    method
  }
}
