import {Tag} from 'sax';
import Widget from './Widget';
import CodeElement from './CodeElement';

export default class SingletonWidget extends Widget {

  constructor(parent: CodeElement) {
    super(parent);
    this.indent = '';
  }

  protected writeInit(tag: Tag): void {
    this.write('tabris.ui.' + tag.name);
    if (Object.keys(tag.attributes).length > 0) {
      this.write('.set(');
      this.writeProperties(tag);
      this.write(')');
    }
  }

}
