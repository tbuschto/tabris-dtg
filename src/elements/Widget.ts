import {QualifiedTag} from 'sax';
import CodeElement from './CodeElement';

abstract class Widget extends CodeElement {

  public get type(): string {
    return this.tag.local;
  }

  public get namespace(): string {
    return this.tag.prefix || 'tabris';
  }

  public get localType(): string {
    if (this.namespace === 'tabris') {
      return 'tabris.' + this.type;
    } else {
      return '_' + this.namespace + '_' + this.type;
    }
  }

  protected writeProperties(tag: QualifiedTag) {
    this.write('{\n');
    this.indent += '  ';
    let separator: string = '';
    for (let property in tag.attributes) {
      let xmlValue = tag.attributes[property];
      if (!xmlValue.prefix) {
        this.write(separator);
        this.writeProperty(property, xmlValue.value);
        separator = `,\n`;
      }
    }
    this.indent = this.indent.slice(2);
    this.write('\n' + this.indent + '}');
  }

  protected writeProperty(name: string, value: string): boolean {
    let type = this.api.getPropertyType(this.namespace, this.type, name);
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

  protected getChildType(tag: QualifiedTag): string {
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
