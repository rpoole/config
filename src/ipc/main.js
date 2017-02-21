import { ipcMain } from 'electron';
import fs from 'fs';
import async from 'async';

export default function registerEvents() {
  ipcMain.on('parse-directory', (event, path) => {
    listFiles(path, 2, (err, files) => {
      if (err) {
        event.sender.send('directory-parsed-err', err);
      }

      event.sender.send('directory-parsed', files);
    });
  });
}

function listFiles(root, depth, cb) {
  let rtnFiles = [];

  let recur = (path, level, cb) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        // we can skip if it's not a directory
        // may not work on other OS...ok for now
        if (err.code === 'ENOTDIR') {
          return cb();
        } else {
          return cb(err);
        }
      }

      if (depth === level) {
        rtnFiles = rtnFiles.concat(files.map(f => `${path}/${f}`));
        return cb();
      }

      async.each(files, (f, cb) => {
        recur(`${path}/${f}`, level+1, cb);
      }, cb);
    });
  };

  recur(root, 0, (err, files) => {
    if (err) {
      return cb(err);
    }

    return cb(null, rtnFiles);
  });
}
