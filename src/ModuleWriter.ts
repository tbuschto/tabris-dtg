import {createReadStream, WriteStream} from 'fs';
import {parser, SAXParser,  Tag, QualifiedTag} from 'sax';
import CodeElement, {IWriter} from './elements/CodeElement';
import ExistingObject from './elements/ExistingObject';
import NewObject from './elements/NewObject';

const imports = `import * as tabris from 'tabris';`;

export default class ModuleWriter {

  public readonly saxParser: SAXParser;

  private rootElement: CodeElement;
  private stream: WriteStream;

  constructor(writeStream: WriteStream) {
    this.stream = writeStream;
    this.write(imports + '\n\n');
    this.saxParser = parser(true, {});
    this.saxParser.onopentag = this.processTagOpen.bind(this);
    this.saxParser.onclosetag = this.processTagClose.bind(this);
    this.saxParser.onend = this.processDocumentEnd.bind(this);
  }

  private processTagOpen(tag: Tag): void {
    if (!this.rootElement) {
      this.rootElement = createElement(tag, this.write.bind(this));
    }
    this.rootElement.processTagOpen(tag);
  }

  private processTagClose(tag: string): void {
    this.rootElement.processTagClose(tag);
  }

  private processDocumentEnd() {
    this.stream.end(';\n');
  }

  private write(data: string): void {
    this.stream.write(data || '');
  }

}

function createElement(tag: Tag, write: IWriter): CodeElement {
  return tag.name.startsWith('ui.')
    ? new ExistingObject(write, createElement)
    : new NewObject(write, createElement);
}
