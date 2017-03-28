/* tslint:disable */
import * as tabris from 'tabris';
import _import_CustomWidget from './CustomWidget';
import _import_CustomWidget2 from './subdir/CustomWidget2';

tabris.ui.set({
  'win_theme': 'dark'
});

tabris.ui.contentView.set({
  'background': 'blue',
  'opacity': 0.4
}).append(
  new tabris.TextView({
    'text': 'Hello World',
    'highlightOnTouch': true
  }),
  new tabris.ImageView(),
  new tabris.TextInput({
    'text': 'Hello World2',
//    'foo': 'bar',
    'message': 'Hello World3'
  }),
  new tabris.Composite({
    'id': 'foo'
  }).append(
    new tabris.TextView(),
    new tabris.ImageView()
  )
);

tabris.ui.drawer.append(
  new tabris.CollectionView(),
  new _import_CustomWidget({
    'test': 'defaults to string'
  }),
  new _import_CustomWidget2({
    'test': 'defaults to string'
  })
);
