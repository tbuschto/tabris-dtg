/* tslint:disable */
import * as tabris from 'tabris';

export default class extends tabris.Composite {

  constructor(properties?: tabris.CompositeProperties) {
    super((Object as any).assign({
      'background': 'blue',
      'id': 'foo'
    }, properties || {}));
    this.append(
      this.bar = new tabris.TextView({
        'id': 'bar'
      }),
      this.baz = new tabris.ImageView({
        'id': 'baz'
      })
    );
  }

  protected bar: tabris.TextView;

  protected baz: tabris.ImageView;

}
