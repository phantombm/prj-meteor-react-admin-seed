import { Meteor } from 'meteor/meteor';

import { Links } from '../links';

Meteor.publish('links.all', () => {
  return Links.find({});
});
