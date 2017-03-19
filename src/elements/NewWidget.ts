import {Tag} from 'sax';
import Widget from './Widget';

export default class NewWidget extends Widget {

  protected writeInit(tag: Tag): void {
    this.write(this.indent + 'new tabris.' + tag.name + '(');
    this.writeProperties(tag);
    this.write(')');
  }

}
