import {createReadStream, createWriteStream} from 'fs';
import {parser, SAXParser,  Tag, QualifiedTag} from 'sax';

const filename = process.argv[2];

if (!filename) {
  console.log('No file given');
}

const readStream = createReadStream(filename, {encoding: 'utf-8'});
const saxParser = createSaxParser();
const writeStream = createWriteStream(filename.replace('.xml', '-xml.ts'), {encoding: 'utf-8'});

readStream.addListener('data', (chunk) => saxParser.write(chunk));
readStream.addListener('end', () => saxParser.close())
readStream.addListener('error', (error) => console.error(error));

function createSaxParser(): SAXParser {
  const result = parser(true, {});
  result.onopentag = (tag: Tag  | QualifiedTag) => {
    writeStream.write(`<${tag.name}>`);
  };
  result.onclosetag = (tag: string) => {
    writeStream.write(`</${tag}>`);
  };
  result.onend = () => writeStream.close();
  return result;
}
