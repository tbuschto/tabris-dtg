import {Tag} from 'sax';

enum State {init, created, open, closed};

export interface IWriter {(text: string): void;};
export interface IElementFactory {(tag: Tag, write: IWriter, indet: string): CodeElement; };

abstract class CodeElement {

  protected readonly write: IWriter;
  protected readonly indent: string;
  protected readonly createElement: IElementFactory;
  protected _state: State = State.init;
  protected currentChild: CodeElement = null;

  constructor(writer: IWriter, createElement: IElementFactory, indent: string) {
    this.write = writer;
    this.indent = indent;
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
    this.write('.append(\n');
  }

  protected writeClose(): void {
    this.write('\n' + this.indent + ')');
  }

  protected writeSeparator(): void {
    this.write(',\n');
  }

  protected addChild(tag: Tag): void {
    this.currentChild = this.createElement(tag, this.write, this.indent + '  ');
    this.currentChild.processTagOpen(tag);
  }

}

export default CodeElement;
