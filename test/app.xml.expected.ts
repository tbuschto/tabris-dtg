/* tslint:disable */
import * as tabris from 'tabris';

tabris.ui.set({
  'win_theme': 'dark'
});

tabris.ui.contentView.set({
  'background': 'blue'
}).append(
  new tabris.TextView({
    'text': 'Hello World'
  }),
  new tabris.ImageView(),
  new tabris.TextInput({
    'text': 'Hello World2',
    'message': 'Hello World3'
  }),
  new tabris.Composite().append(
    new tabris.TextView(),
    new tabris.ImageView()
  )
);

tabris.ui.drawer.append(
  new tabris.CollectionView()
);
