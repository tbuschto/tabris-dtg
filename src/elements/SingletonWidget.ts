import {QualifiedTag} from 'sax';
import Widget from './Widget';
import CodeElement from './CodeElement';

export default class SingletonWidget extends Widget {

  constructor(parent: CodeElement) {
    super(parent);
    this.indent = '';
  }

  public get type() {
    let parent: Widget = <Widget> this.parent;
    return this.api.getPropertyType(parent.namespace, parent.type, this.tag.name);
  }

  protected writeInit(tag: QualifiedTag): void {
    this.write('tabris.ui.' + tag.name);
    if (Object.keys(tag.attributes).length > 0) {
      this.write('.set(');
      this.writeProperties(tag);
      this.write(')');
    }
  }

}
