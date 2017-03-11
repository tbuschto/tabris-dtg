import {readFile} from 'fs';

let filename: string = process.argv[2];

readFile(filename, 'utf8', (err, data) => {
  console.log(data)
});
