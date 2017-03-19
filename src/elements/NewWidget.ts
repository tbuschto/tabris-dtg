import {Tag} from 'sax';
import Widget from './Widget';

export default class NewWidget extends Widget {

  protected writeInit(tag: Tag): void {
    this.write(this.indent + 'new tabris.' + tag.name + '(');
    if (Object.keys(tag.attributes).length > 0) {
      this.writeProperties(tag);
    }
    this.write(')');
  }

}
