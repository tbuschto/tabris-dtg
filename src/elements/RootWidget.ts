import CodeElement from './CodeElement';
import Widget from './Widget';
import {API} from '../TabrisAPI';

interface IElementFactory {(type: string, parent: CodeElement): CodeElement; };
interface IWriter {(data: string): void; };

abstract class RootWidget extends Widget {

  protected readonly _api: API;
  private elementFactory: IElementFactory;
  private writer: IWriter;

  constructor(writer: IWriter, elementFactory: IElementFactory, api: API) {
    super(null);
    this.writer = writer;
    this.elementFactory = elementFactory;
    this._api = api;
  }

  protected write(data: string) {
    this.writer(data);
  }

  protected get api(): API {
    return this._api;
  }

  protected createElement(type: string, parent: CodeElement): CodeElement {
    return this.elementFactory(type, parent);
  }

}

export default RootWidget;
