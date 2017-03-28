import {createReadStream, createWriteStream, WriteStream, ReadStream} from 'fs';
import {parser, SAXParser,  Tag, QualifiedTag} from 'sax';
import ModuleWriter from './ModuleWriter';
import {API} from './TabrisAPI';
import {CustomType} from './CustomAPI';

export default function convert(file: string, done: {(success: boolean): void; }) {

  const readStream: ReadStream = createReadStream(file, {encoding: 'utf-8'});
  const writeStream: WriteStream = createWriteStream(file.replace('.xml', '.xml.ts'), {encoding: 'utf-8'});
  const moduleWriter: ModuleWriter = new ModuleWriter(writeStream, importResolver);
  const saxParser: SAXParser = moduleWriter.saxParser;
  let closed = false;

  readStream.addListener('data', (chunk) => {
    try {
      saxParser.write(chunk);
    } catch (ex) {
      fail(ex);
    }
  });

  saxParser.onerror = fail;

  readStream.addListener('end', () => {
    saxParser.close();
  });

  readStream.addListener('error', fail);

  writeStream.addListener('finish', success);

  function success(ex: Error) {
    if (!closed) {
      closed = true;
      done(true);
    }
  }

  function fail(ex: Error) {
    if (!closed) {
      closed = true;
      console.error('Conversion failed: ' + ex);
      readStream.close();
      writeStream.close();
      try {
        saxParser.close();
      } catch (streamEx) {
        // may fail if in saxParser event
      }
      done(false);
    }
  }

}

function importResolver(path: string): CustomType {
  return {baseType: 'Composite', baseNamespace: 'tabris'};
}
