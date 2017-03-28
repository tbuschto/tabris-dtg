import {QualifiedTag} from 'sax';
import Scope from '../Scope';

export enum State {uninitialized, initialized, open, closed};

abstract class CodeElement {

  protected indent: string;
  protected tag: QualifiedTag;
  private readonly _parent: CodeElement;
  private currentChild: CodeElement = null;
  private _state: State = State.uninitialized;
  private childCount: number = 0;

  constructor(parent: CodeElement) {
    this._parent = parent;
    this.indent = parent != null ? parent.indent + '  ' : '';
  }

  public get state(): State {
    return this._state;
  }

  public get parent(): CodeElement {
    return this._parent;
  }

  public processTagOpen(tag: QualifiedTag): void {
    this.tag = tag;
    if (this.state === State.uninitialized) {
      this.writeInit(tag);
      this._state = State.initialized;
    } else if (this.currentChild) {
      this.currentChild.processTagOpen(tag);
    } else {
      if (this.state === State.initialized) {
        this.writeOpen();
        this._state = State.open;
      }
      if (this.childCount > 0) {
        this.writeSeparator();
      }
      this.addChild(tag);
    }
  }

  public processTagClose(tagName: string): void {
    if (this.currentChild) {
      this.currentChild.processTagClose(tagName);
      if (this.currentChild.state === State.closed) {
        this.currentChild = null;
      }
    } else {
      if (this.state === State.open) {
        this.writeClose();
      }
      this._state = State.closed;
      this.writeEnd();
    }
  }

  protected addChild(tag: QualifiedTag): void {
    this.currentChild = this.createElement(this.getChildType(tag), this);
    this.currentChild.processTagOpen(tag);
    this.childCount++;
  }

  protected abstract writeInit(tag: QualifiedTag): void;

  protected abstract writeOpen(): void;

  protected abstract writeSeparator(): void;

  protected abstract writeClose(): void;

  protected abstract writeEnd(): void;

  protected get api(): Scope {
    return this.parent.api;
  }

  protected write(data): void {
    this.parent.write(data);
  }

  protected abstract getChildType(tag: QualifiedTag): string;

  // Unfortunately referencing  a class in it's own superclass does not work
  // in ES6/TS unless they are both in the same module. This indirection works
  // around this issue.
  protected createElement(type: string, parent: CodeElement): CodeElement {
    return this.parent.createElement(type, parent);
  }

}

export default CodeElement;
