import {ipcRenderer} from 'electron';

function keyedIpcEvent(eventName) {
  const args = Array.prototype.slice.call(arguments, 1);
  const key = args.reduce((sum, val) => {
    return sum = sum + val;
  }, '');

  return new Promise((resolve, reject) => {
    ipcRenderer.once(`${eventName}-done${key}`, (event, data) => {
      resolve(data);
    })

    ipcRenderer.once(`${eventName}-err${key}`, (event, data) => {
      reject(data);
    })

    ipcRenderer.send(eventName, key, ...args);

  });
}

function parseDirectory(filePath) {
  return keyedIpcEvent('parse-directory', ...arguments);
}

function addProperty(path, property, value) {
  return keyedIpcEvent('add-property', ...arguments);
}

var api = {
  parseDirectory: parseDirectory,
  addProperty: addProperty,
};

export default api
