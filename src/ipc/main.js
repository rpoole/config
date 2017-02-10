import { ipcMain } from 'electron';
import { fs } from 'fs';
import walk from 'walk';

export default function registerEvents() {
  ipcMain.on('parse-directory', (event, dir) => {
    parseDirectory(dir, (files) => {
      event.sender.send('directory-parsed', files);
    });
  });
}


function parseDirectory(dir, callback) {
  let walker = walk.walk(dir, { followLinks: false });
  let files = [];

  walker.on('file', (root, stat, next) => {
    files.push(root + '/' + stat.name);
    next();
  });

  walker.on('end', () => {
    callback(files);
  });

  walker.on('errors', callback);
}
