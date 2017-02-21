import {ipcRenderer} from 'electron';

function parseDirectory(filePath) {
  return new Promise((resolve, reject) => {
    ipcRenderer.on('directory-parsed', (event, data) => {
      resolve(data);
    })

    ipcRenderer.on('directory-parsed-err', (event, data) => {
      reject(data);
    })

    ipcRenderer.send('parse-directory', filePath);
  });
}

function addProperties(properties, projects, environments, callback) {

}

function editProperties(propertyChanges, projects, environments, callback) {

}

function removeProperties(properties, projects, environments, callback) {

}

var api = {
  parseDirectory: parseDirectory,
  addProperties: addProperties,
  editProperties: editProperties,
  removeProperties: removeProperties,
};

export default api
