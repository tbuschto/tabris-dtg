import HelloTabUI from './HelloTab.xml';

export default class extends HelloTabUI {

  constructor(properties?) {
    super(properties);
    this.button.on('select', () => {
      this.message.text += ' World!';
    });
  }

}
