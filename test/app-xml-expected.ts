import * as tabris from 'tabris';

tabris.ui.contentView.append(
  new tabris.TextView(),
  new tabris.ImageView(),
  new tabris.TextView(),
  new tabris.Composite().append(
    new tabris.TextView(),
    new tabris.ImageView()
  )
)