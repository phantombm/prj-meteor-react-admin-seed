import { Meteor } from 'meteor/meteor';
import { PrivacyPolicy } from '../privacyPolicy';

import { Roles } from 'meteor/alanning:roles';

Meteor.publish('privacyPolicy', function() {
  // if (!Roles.userIsInRole(this.userId, ['owner'], Roles.GLOBAL_GROUP)) {
  //   return this.ready();
  // }

  return PrivacyPolicy.find({});
});
