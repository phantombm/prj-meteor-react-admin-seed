import { Meteor } from 'meteor/meteor';
import { TermsOfService } from '../termsOfService';

import { Roles } from 'meteor/alanning:roles';

Meteor.publish('termsOfService', function() {
  // if (!Roles.userIsInRole(this.userId, ['owner'], Roles.GLOBAL_GROUP)) {
  //   return this.ready();
  // }

  return TermsOfService.find({});
});
