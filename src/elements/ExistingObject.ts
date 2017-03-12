import {Tag} from 'sax';
import CodeElement from './CodeElement';

export default class ExistingObject extends CodeElement {

  protected writeCreation(tag: Tag): void {
    this.write('tabris.' + tag.name);
  }

}