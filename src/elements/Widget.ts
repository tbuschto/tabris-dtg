import {Tag} from 'sax';
import CodeElement from './CodeElement';

abstract class Widget extends CodeElement {

  protected writeOpen(): void {
    this.write('.append(\n');
  }

  protected writeSeparator(): void {
    this.write(',\n');
  }

  protected writeClose() {
    this.write('\n' + this.indent + ')');
  }

  protected writeEnd() {
    // nothing to do
  }

  protected getChildType(tag: Tag): string {
    return 'NewWidget';
  }

}

export default Widget;
