import convert from './convert';
import {readdir, stat} from 'fs';

const filename = process.argv[2];

if (!filename) {
  console.log('No file or path given');
} else {
  stat(filename, (statError, stat) => {
    if (statError) {
      console.log(filename + ' not found');
    } else {
      if (stat.isDirectory()) {
        convertAll(filename, finishAll);
      } else {
        convert(filename, finishFile);
      }
    }
  });
}

function finishFile(success: boolean) {
  if (success) {
    console.log(filename + ' converted to typescript');
  } else {
    console.log(filename + ' conversion failed');
  }
}

function finishAll(failCount: number, successCount: number): void {
  if (failCount > 0) {
    console.log(failCount + ' conversions failed, ');
  } else if (successCount === 0) {
    console.log('No files found to convert.');
  }
  if (successCount > 0) {
    console.log(successCount + ' xml files successfully converted to typescript');
  }
}

function convertAll(dir: string, done: typeof finishAll) {
  let successCount = 0;
  let failCount = 0;
  readdir(dir, (readError, list) => {
    if (readError) {
      return done(0, 0);
    }
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) {
        return done(failCount, successCount);
      }
      file = dir + '/' + file;
      stat(file, (statError, stat) => {
        if (stat && stat.isDirectory()) {
          convertAll(file, (innerFailCount, innerSuccessCount) => {
            failCount += innerFailCount;
            successCount += innerSuccessCount;
            next();
          });
        } else if (file.endsWith('.xml') {
          convert(file, (success) => {
            if (success) {
              successCount++;
            } else {
              failCount++;
            }
            next();
          })
        } else {
          next();
        }
      });
    })();
  });
};
