import {QualifiedTag} from 'sax';
import RootWidget from './RootWidget';

export default class CustomWidget extends RootWidget {

  private fields: string[] = [];

  public addField(code: string): void {
    this.fields.push(code);
  }

  protected writeInit(tag: QualifiedTag): void {
    this.write('export default class extends ' + this.type + ' {\n\n');
    this.indent += '  ';
    this.write(this.indent + 'constructor(properties?: ' + this.type + 'Properties) {\n' );
    this.indent += '  ';
    if (Object.keys(tag.attributes).length > 0) {
      this.write(this.indent + 'super((Object as any).assign(');
      this.writeProperties(tag);
      this.write(', properties || {}));\n');
    } else {
      this.write(this.indent + 'super(properties || {});\n');
    }
    this.write(this.indent + 'this');
  }

  protected writeEnd(): void {
    this.write(';\n');
    this.indent = this.indent.slice(2);
    this.write(this.indent + '}\n\n');
    this.writeFields();
    this.indent = this.indent.slice(2);
    this.write('}\n');
  }

  protected getChildType(tag: QualifiedTag) {
    return 'NewWidget';
  }

  private writeFields(): void {
    for (let field of this.fields) {
      this.write(this.indent + field + '\n\n');
    }
  }

}
