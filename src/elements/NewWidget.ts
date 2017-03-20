import {QualifiedTag} from 'sax';
import Widget from './Widget';
import CustomWidget from './CustomWidget';
import CodeElement from './CodeElement';

export default class NewWidget extends Widget {

  private customWidget: CustomWidget = null;

  constructor(parent: CodeElement) {
    super(parent);
    this.customWidget = this.findCustomWidget();
  }

  protected writeInit(tag: QualifiedTag): void {
    this.write(this.indent);
    if (tag.attributes.id && this.customWidget) {
      let id: string = tag.attributes.id.value;
      this.customWidget.addField(`protected ${id}: ${this.type};`);
      this.write(`this.${id} = `);
    }
    this.write('new ' + this.type + '(');
    if (Object.keys(tag.attributes).length > 0) {
      this.writeProperties(tag);
    }
    this.write(')');
  }

  private findCustomWidget(): CustomWidget {
    let result: CodeElement = this.parent;
    while (!(result instanceof CustomWidget) && (result != null)) {
      result = result.parent;
    }
    return result as CustomWidget;
  }

}
