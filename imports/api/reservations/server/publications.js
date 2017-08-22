import { Meteor } from 'meteor/meteor';
import { Reservations } from '../reservations';

import { Roles } from 'meteor/alanning:roles';

Meteor.publish('reservations', function(id) {
  // if (!Roles.userIsInRole(this.userId, ['owner'], Roles.GLOBAL_GROUP)) {
  //   return this.ready();
  // }

  return Reservations.find({
    'user.userId': id
  });
});
