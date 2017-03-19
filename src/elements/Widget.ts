import {Tag} from 'sax';
import CodeElement from './CodeElement';

abstract class Widget extends CodeElement {

  get type(): string {
    return 'tabris.' + this.tagName;
  }

  protected writeProperties(tag: Tag) {
    this.write('{\n');
    this.indent += '  ';
    let separator: string = '';
    for (let property in tag.attributes) {
      this.write(separator);
      this.writeProperty(property, tag.attributes[property]);
      separator = `,\n`;
    }
    this.indent = this.indent.slice(2);
    this.write('\n' + this.indent + '}');
  }

  protected writeProperty(name: string, value: string): boolean {
    let type = this.api.getPropertyType(this.type, name);
    if (!type) {
      this.write('//');
    }
    this.write(`${this.indent}'${name}': ${format(type, value)}`);
    return true;
  }

  protected formatPropertyValue(type: string, value: string): string {
    return '';
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

function format(type: string, value: string) {
  if (type === 'boolean' || type === 'number') {
    return value;
  }
  return '\'' + value + '\'';

}
