import {createReadStream, WriteStream} from 'fs';
import {parser, SAXParser,  Tag, QualifiedTag} from 'sax';
import CodeElement from './elements/CodeElement';
import UI from './elements/UI';
import SingletonWidget from './elements/SingletonWidget';
import NewWidget from './elements/NewWidget';
import CustomWidget from './elements/CustomWidget';

const imports = `import * as tabris from 'tabris';`;

export default class ModuleWriter {

  public readonly saxParser: SAXParser;

  private rootElement: CodeElement;
  private stream: WriteStream;

  constructor(writeStream: WriteStream) {
    this.stream = writeStream;
    this.stream.write(imports + '\n\n');
    this.saxParser = parser(true, {});
    this.saxParser.onopentag = this.processTagOpen.bind(this);
    this.saxParser.onclosetag = this.processTagClose.bind(this);
    this.saxParser.onend = this.processDocumentEnd.bind(this);
  }

  private processTagOpen(tag: Tag): void {
    if (!this.rootElement) {
      this.rootElement = this.createRootElement(tag);
    }
    this.rootElement.processTagOpen(tag);
  }

  private processTagClose(tag: string): void {
    this.rootElement.processTagClose(tag);
  }

  private processDocumentEnd() {
    this.stream.end();
  }

  private createRootElement(tag: Tag): CodeElement {
    if (tag.name === 'ui') {
      return new UI(
        (data: string) => this.stream.write(data),
        elementFactory
      );
    } else if (tag.name[0] === tag.name[0].toUpperCase()) {
      return new CustomWidget(
        (data: string) => this.stream.write(data),
        elementFactory
      );
    } else {
      throw new Error('Invalid root element "' + tag.name + '"');
    }
  }

}

function elementFactory(type: string, parent: CodeElement): CodeElement {
  if (type === 'NewWidget') {
    return new NewWidget(parent);
  }
  if (type === 'SingletonWidget') {
    return new SingletonWidget(parent);
  }
}
