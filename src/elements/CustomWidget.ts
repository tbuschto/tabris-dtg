import {Tag} from 'sax';
import RootWidget from './RootWidget';

export default class CustomWidget extends RootWidget {

  protected writeInit(tag: Tag): void {
    this.write('export default class extends tabris.' + tag.name + ' {\n\n');
    this.indent += '  ';
    this.write(this.indent + 'constructor() {\n' );
    this.indent += '  ';
    this.write(this.indent + 'super();\n')
    this.write(this.indent + 'this');
  }

  protected writeEnd(): void {
    this.write(';\n');
    this.indent = this.indent.slice(2);
    this.write(this.indent + '}\n\n');
    this.indent = this.indent.slice(2);
    this.write('}\n');
  }

  protected getChildType(tag: Tag) {
    return 'NewWidget';
  }

}
