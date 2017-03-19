/* tslint:disable */
import * as tabris from 'tabris';

export default class extends tabris.Composite {

  constructor(properties) {
    super(Object.assign({
      'background': 'blue'
    }, properties || {}));
    this.append(
      new tabris.TextView(),
      new tabris.ImageView()
    );
  }

}
