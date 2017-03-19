/* tslint:disable */
import * as tabris from 'tabris';

tabris.ui.contentView.append(
  new tabris.TextView({
    'text': 'Hello World'
  }),
  new tabris.ImageView(),
  new tabris.TextView({
    'text': 'Hello World2'
  }),
  new tabris.Composite().append(
    new tabris.TextView(),
    new tabris.ImageView()
  )
);

tabris.ui.drawer.append(
  new tabris.CollectionView()
);
