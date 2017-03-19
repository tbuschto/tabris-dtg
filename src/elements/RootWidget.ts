import {Tag} from 'sax';
import CodeElement from './CodeElement';
import Widget from './Widget';
import TabrisAPI from '../TabrisAPI';

interface IElementFactory {(type: string, parent: CodeElement): CodeElement; };
interface IWriter {(data: string): void; };

abstract class RootWidget extends Widget {

  protected readonly _api;
  private elementFactory: IElementFactory;
  private writer: IWriter;

  constructor(writer: IWriter, elementFactory: IElementFactory, api: TabrisAPI) {
    super(null);
    this.writer = writer;
    this.elementFactory = elementFactory;
    this._api = api;
  }

  protected write(data: string) {
    this.writer(data);
  }

  protected get api(): TabrisAPI {
    return this._api;
  }

  protected createElement(type: string, parent: CodeElement): CodeElement {
    return this.elementFactory(type, parent);
  }

}

export default RootWidget;
