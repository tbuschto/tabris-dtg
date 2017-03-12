import {Tag} from 'sax';

enum State {init, created, open, closed};

export interface IWriter {(text: string): void;};
export interface IElementFactory {(tag: Tag, write: IWriter): CodeElement; };

abstract class CodeElement {

  protected readonly write: IWriter;
  protected readonly writeln: IWriter;

  private _state: State = State.init;
  private currentChild: CodeElement = null;
  private createElement: IElementFactory;

  constructor(writer: IWriter, createElement: IElementFactory) {
    this.write = writer;
    this.writeln = (text: string) => writer(text + '\n');
    this.createElement = createElement;
  }

  public get state(): State {
    return this._state;
  }

  public processTagOpen(tag: Tag): void {
    if (this.state === State.init) {
      this.writeCreation(tag);
      this._state = State.created;
    } else if (this.currentChild) {
      this.currentChild.processTagOpen(tag);
    } else if (this.state !== State.open) {
      this.writeOpen();
      this._state = State.open;
      this.addChild(tag);
    } else {
      this.writeSeparator();
      this.addChild(tag);
    }
  }

  public processTagClose(tagName: string): void {
    if (this.currentChild) {
      this.currentChild.processTagClose(tagName);
      if (this.currentChild.state === State.closed) {
        this.currentChild = null;
      }
    } else if (this.state === State.open) {
      this.writeClose();
      this._state = State.closed;
    } else {
      this._state = State.closed;
    }
  }

  protected abstract writeCreation(tag: Tag): void;

  protected writeOpen(): void {
    this.writeln('.append(');
  }

  protected writeClose(): void {
    this.write('\n)');
  }

  protected writeSeparator(): void {
    this.writeln(',');
  }

  protected addChild(tag: Tag): void {
    const writer: IWriter = (data: string) => this.write('  ' + data);
    this.currentChild = this.createElement(tag, writer);
    this.currentChild.processTagOpen(tag);
  }

}

export default CodeElement;
