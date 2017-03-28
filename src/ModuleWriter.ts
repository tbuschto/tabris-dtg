import {createReadStream, WriteStream} from 'fs';
import {parser, SAXParser, QualifiedTag, QualifiedAttribute} from 'sax';
import CodeElement from './elements/CodeElement';
import UI from './elements/UI';
import SingletonWidget from './elements/SingletonWidget';
import NewWidget from './elements/NewWidget';
import CustomWidget from './elements/CustomWidget';
import TabrisAPI, {API} from './TabrisAPI';
import Scope from './Scope';
import {basename} from 'path';

const tslint = '/* tslint:disable */';
const tabrisImport = `import * as tabris from 'tabris';`;
const catchImport = /^import\((.+)\)$/;

interface ImportResolver {(path: string): API; };

export default class ModuleWriter {

  public readonly saxParser: SAXParser;

  private rootElement: CodeElement;
  private stream: WriteStream;
  private importResolver: ImportResolver;
  private scope: Scope;

  constructor(writeStream: WriteStream, importResolver: ImportResolver) {
    this.stream = writeStream;
    this.importResolver = importResolver;
    this.stream.write(tslint + '\n');
    this.stream.write(tabrisImport + '\n');
    this.scope = new Scope();
    this.scope.addNamespace('tabris', new TabrisAPI('2.0'));
    this.saxParser = parser(true, {xmlns: true});
    this.saxParser.onopentag = this.processTagOpen.bind(this);
    this.saxParser.onclosetag = this.processTagClose.bind(this);
    this.saxParser.onend = this.processDocumentEnd.bind(this);
  }

  private processTagOpen(tag: QualifiedTag): void {
    if (!this.rootElement) {
      this.handleImports(tag);
      this.stream.write('\n');
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

  private createRootElement(tag: QualifiedTag): CodeElement {
    if (tag.name === 'ui') {
      return new UI(
        (data: string) => this.stream.write(data),
        elementFactory,
        this.scope
      );
    } else if (tag.name[0] === tag.name[0].toUpperCase()) {
      return new CustomWidget(
        (data: string) => this.stream.write(data),
        elementFactory,
        this.scope
      );
    } else {
      throw new Error('Invalid root element "' + tag.name + '"');
    }
  }

  private handleImports(tag: QualifiedTag) {
    for (let attribute in tag.attributes) {
      let xmlValue: QualifiedAttribute = tag.attributes[attribute];
      if (xmlValue.prefix === 'xmlns') {
        let matches = catchImport.exec(xmlValue.value);
        if (matches) {
          let ns: string = xmlValue.local;
          let files = matches[1].split(',');
          for (let file of files) {
            let path: string = file.trim().slice(0, -4);
            this.writeImport(ns, path);
            this.scope.addNamespace(ns, this.importResolver(path));
          }
        }
      }
    }
  }

  private writeImport(ns: string, path: string): void {
    this.stream.write(`import _${ns}_${basename(path)} from '${path}';\n`);
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
