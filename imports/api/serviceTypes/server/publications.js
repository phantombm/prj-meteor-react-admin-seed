import { Meteor } from 'meteor/meteor';

import { ServiceTypes } from '../serviceTypes';

Meteor.publish('serviceTypes', function() {
  return ServiceTypes.find({});
});
