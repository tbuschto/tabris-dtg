import {Tag} from 'sax';
import CodeElement from './CodeElement';

abstract class Widget extends CodeElement {

  protected writeProperties(tag: Tag) {
    if (Object.keys(tag.attributes).length === 0) {
      return;
    }
    this.write('{\n');
    this.indent += '  ';
    let separator: string = '';
    for (let property in tag.attributes) {
      this.write(separator);
      this.writeProperty(property, tag.attributes[property]);
      separator = `'`;
    }
    this.indent = this.indent.slice(2);
    this.write(this.indent + '}');
  }

  protected writeProperty(name: string, value: string) {
    this.write(`${this.indent}'${name}': '${value}'\n`);
  }

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
