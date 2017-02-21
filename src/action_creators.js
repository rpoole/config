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
