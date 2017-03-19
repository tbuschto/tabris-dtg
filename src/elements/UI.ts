import {Tag} from 'sax';
import RootWidget from './RootWidget';
import Widget from './Widget';

export default class UI extends RootWidget {

  get type(): string {
    return 'tabris.UI';
  }

  protected writeInit(tag: Tag): void {
    if (Object.keys(tag.attributes).length > 0) {
      this.write('tabris.ui.set(');
      this.writeProperties(tag);
      this.write(');\n\n');
    }
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
