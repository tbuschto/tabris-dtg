import {Tag} from 'sax';
import RootWidget from './RootWidget';
import Widget from './Widget';

export default class UI extends RootWidget {

  protected writeInit(): void {
    // TODO: set properties
  }

  protected writeOpen(): void {
    // Nothing to do
  }

  protected writeSeparator(): void {
    this.write(';\n\n');
  }

  protected writeClose() {
    // nothing to do
  }

  protected writeEnd() {
    this.write(';\n');
  }

  protected getChildType(tag: Tag) {
    return 'SingletonWidget';
  }

}
