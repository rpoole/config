import { ipcMain } from 'electron';
import fs from 'fs';
import async from 'async';
import Git from 'nodegit';

export default function registerEvents() {
  keyedIpcEvent('parse-directory', listFiles);
  keyedIpcEvent('add-property', addProperty);
}

function keyedIpcEvent(eventName, handler) {
  function onMainEvent(event, key) {
    function onHandlerDone() {
      const err = arguments[0];
      if (err) {
        console.error(err);
        event.sender.send(`${eventName}-err${key}`, err);
      }

      const args = Array.prototype.slice.call(arguments, 1);
      event.sender.send(`${eventName}-done${key}`, ...args);
    }

    const args = Array.prototype.slice.call(arguments, 2);
    handler(...args, onHandlerDone);
  }

  ipcMain.on(eventName, onMainEvent);
}


function listFiles(root, cb) {
  let rtnFiles = [];
  const depth = 2;

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

function gitPull() {
  return Git.Repository
    .open("../sxconfig_test")
    .then((repo) => {
      return repo.fetchAll({
        callbacks: {
          credentials: (url, userName) => {
            return Git.Cred.sshKeyNew(
                userName,
                '/Users/rpoole/.ssh/id_rsa.pub',
                '/Users/rpoole/.ssh/id_rsa',
                ''
                );
          },
          certificateCheck: () => {
            return 1;
          },
        },
      })
      .then(() => {
        return repo.mergeBranches('master', 'origin/master');
      });
    });
}

function gitPush() {
  return Promise.resolve('push succeed');
}

function runGitAction(action, commitMsg, count=0) {
  return gitPull()
  .then(action)
  .then(gitPush)
  .then(() => {
    return Promise.resolve('All done');
  })
  .catch(() => {
    if (count == 2) {
      return Promise.reject('Too many failures');
    } else {
      count = count+1;
      return runGitAction(action, count);
    }
  });
}

function addProperty(path, property, value, cb) {
  const action = function() {
    return new Promise((resolve, reject) => {
      fs.appendFile(path, `${property} = ${value}\n`, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  };

  runGitAction(action, `Adding ${property}`)
    .then(() => {
      cb(null);
    })
    .catch(cb);
}
