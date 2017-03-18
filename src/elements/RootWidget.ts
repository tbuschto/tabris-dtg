import {Tag} from 'sax';
import CodeElement from './CodeElement';
import Widget from './Widget';

interface IElementFactory {(type: string, parent: CodeElement): CodeElement; };
interface IWriter {(data: string): void; };

abstract class RootWidget extends Widget {

  private elementFactory: IElementFactory;
  private writer: IWriter;

  constructor(writer: IWriter, elementFactory: IElementFactory) {
    super(null);
    this.writer = writer;
    this.elementFactory = elementFactory;
  }

  protected write(data: string) {
    this.writer(data);
  }

  protected createElement(type: string, parent: CodeElement): CodeElement {
    return this.elementFactory(type, parent);
  }

}

export default RootWidget;
