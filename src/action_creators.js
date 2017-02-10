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
