import {Tag} from 'sax';
import CodeElement from './CodeElement';

export default class NewObject extends CodeElement {

  protected writeCreation(tag: Tag): void {
    this.write('new tabris.' + tag.name + '()');
  }

}