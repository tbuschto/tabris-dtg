import convert from './convert';

const filename = process.argv[2];

if (!filename) {
  console.log('No file given');
} else {
  convert(filename, finish);
}

function finish(success: boolean) {
  if (success) {
    console.log(filename + ' converted to typescript');
  } else {
    console.log(filename + 'conversion failed');
  }
}
