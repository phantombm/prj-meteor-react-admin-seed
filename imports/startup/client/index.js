import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import './routes';
import { renderRoutes } from './routes';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('application'));
});
