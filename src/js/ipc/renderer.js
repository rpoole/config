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

function addProperty(path, property, value) {
  return new Promise((resolve, reject) => {
    console.log(`Path: ${path}\nProperty: ${property}\nValue: ${value}`);
    setTimeout(resolve, Math.random() * 3000 + 1000);
  });
}

function editProperties(propertyChanges, projects, environments, callback) {

}

function removeProperties(properties, projects, environments, callback) {

}

var api = {
  parseDirectory: parseDirectory,
  addProperty: addProperty,
  editProperties: editProperties,
  removeProperties: removeProperties,
};

export default api
