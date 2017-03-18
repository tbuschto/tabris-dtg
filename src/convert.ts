import { createReadStream, createWriteStream, WriteStream, ReadStream } from 'fs';
import {parser, SAXParser,  Tag, QualifiedTag} from 'sax';
import ModuleWriter from './ModuleWriter';

export default function convert(file: string, done: {(success: boolean): void; }) {

  const readStream: ReadStream = createReadStream(file, {encoding: 'utf-8'});
  const writeStream: WriteStream = createWriteStream(file.replace('.xml', '.xml.ts'), {encoding: 'utf-8'});
  const moduleWriter: ModuleWriter = new ModuleWriter(writeStream);
  const saxParser: SAXParser = moduleWriter.saxParser;

  readStream.addListener('data', (chunk) => {
    try {
      saxParser.write(chunk)
    } catch(ex) {
      fail(ex);
    }
  });

  readStream.addListener('end', () => {
    saxParser.close();
  });

  readStream.addListener('error', fail);

  writeStream.addListener('finish', () => done(true));

  function fail(ex: Error) {
    console.error(ex);
    readStream.close();
    writeStream.close();
    saxParser.close();
    done(false);
  }

}
