import { createReadStream, createWriteStream, WriteStream, ReadStream } from 'fs';
import {parser, SAXParser,  Tag, QualifiedTag} from 'sax';
import ModuleWriter from './ModuleWriter';

const filename = process.argv[2];

if (!filename) {
  console.log('No file given');
}

const readStream: ReadStream = createReadStream(filename, {encoding: 'utf-8'});
const writeStream: WriteStream = createWriteStream(filename.replace('.xml', '-xml.ts'), {encoding: 'utf-8'});
const moduleWriter: ModuleWriter = new ModuleWriter(writeStream);
const saxParser: SAXParser = moduleWriter.saxParser;

readStream.addListener('data', (chunk) => saxParser.write(chunk));
readStream.addListener('end', () => saxParser.close());
readStream.addListener('error', (error) => console.error(error));
